#!/usr/bin/env python
import sys
from itertools import islice
from pprint import pprint
from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextContainer, LTChar

def findMaxFontSize(pdf):
    """ 求出目标 pdf 第一页中的最大字体大小并返回

    :param pdf: 待处理的 pdf 文件url
    :return: 最大字体大小 
    """
    maxFontSize = 0; count = 0
    LIMIT = 4 # 最多处理到第 LIMIT 个元素

    for page_layout in extract_pages(pdf, page_numbers=0):
        for element in page_layout:
            count += 1
            if not isinstance(element, LTTextContainer): continue

            first_line = next(element.__iter__())
            first_ch = next(first_line.__iter__())
            if not isinstance(first_ch, LTChar): continue

            # 只要求该元素第一行的第一个字符的大小即可
            size = first_ch.size
            if (size > maxFontSize): 
                maxFontSize = size

            if count == LIMIT: break # end for element
        break # end for page_layout
    return maxFontSize

def extractTitle(pdf, size):
    """ 根据字体大小求出目标 pdf 中标题文字并返回

    :param pdf: 待处理的 pdf 文件url
    :param size: 获取的最大字体大小
    :return: 标题 
    """
    print('[title]')
    string = ''

    for page_layout in extract_pages(pdf, page_numbers=0):
        elem_count = 0
        for element in page_layout:
            if not isinstance(element, LTTextContainer): continue
            # else: print("element: No. " + str(elem_count))

            flagElem = False # True 表示标题所在element找到
            flagLine = True # False 表示当前标题是元素中的前几行，并不是所有行
            line_count = 0
            for text_line in element:
                first_ch = next(text_line.__iter__())
                if not isinstance(first_ch, LTChar): continue

                if str(first_ch.size) == str(size):
                    flagElem = True
                    string += text_line.get_text()
                else: 
                    if flagElem: # 即标题所在元素有标题以外的信息
                        elem_count -= 1
                        flagLine = False
                    break # end for text_line
                line_count += 1
            
            if flagElem: 
                if flagLine: line_count = 0
                break # end for element
            elem_count += 1
        break # end for page_layout
    return string.replace('\n', '').encode('utf-8'), elem_count, line_count

def extractAuthor(pdf, elem, line):
    """ 根据作者所在元素等位置信息求出目标 pdf 中作者信息并处理后返回

    :param pdf: 待处理的 pdf 文件url
    :param elem: 含作者信息的元素位置
    :param line: 作者信息所在行的偏移量
    :return: 作者信息列表
    """
    print('[Authors]')
    author_str = ''

    for page_layout in extract_pages(pdf, page_numbers=0):
        elem_count = 0
        for element in page_layout:
            if not isinstance(element, LTTextContainer): continue

            if elem_count != elem:
                elem_count += 1
                continue

            if line == 0: # 此时读入目标元素的全部内容
                for text_line in element:
                    size = next(text_line.__iter__()).size
                    for character in text_line:
                        ch = character.get_text()
                        # 去掉特殊的角标
                        if ch == ' ' or ch == '†' or ch == '*': author_str += ' '
                        elif not isinstance(character, LTChar): continue
                        elif str(character.size) == str(size):
                            author_str += ch
            else: # 此时从当前元素的剩余行读入作者信息
                line_count = 0
                for text_line in element:
                    if line_count < line: 
                        line_count += 1
                        continue

                    size = next(text_line.__iter__()).size
                    for character in text_line:
                        ch = character.get_text()
                        # 去掉特殊的角标
                        if ch == ' ' or ch == '†' or ch == '*': author_str += ' '
                        elif not isinstance(character, LTChar): continue
                        elif str(character.size) == str(size):
                            author_str += ch
                    line_count += 1
            break # end for element 
        break # end for page_layout

    author_str = author_str.replace(u'\xa0', u'').replace('&', ',').replace('and ', ',')
    authors = [s.strip().encode('utf-8') for s in author_str.split(',') if s.strip() != '']
    return authors

def extractAbstract(pdf, elem):
    """ 根据摘要可能所在的元素位置求出目标 pdf 中摘要文字并返回

    :param pdf: 待处理的 pdf 文件url
    :param elem: 摘要可能所在的元素位置
    :return: 摘要
    """
    print('[Abstract]')
    abstract = ''; hasAbstract = False
    LIMIT = 10 # 最多尝试寻找的元素个数
    elem_count = 0

    for page_layout in extract_pages(pdf, page_numbers=0):
        nextFlag = False # Abstract 对应文本是否在下一元素中
        for element in page_layout:
            if not isinstance(element, LTTextContainer): continue
            if elem_count < elem: 
                elem_count += 1
                continue
            
            first_line = next(element.__iter__()).get_text()
            if nextFlag: # 对应上一元素仅有Abstract几个字，真正的摘要内容在本元素的情况
                abstract += element.get_text()
                break # end for element
            elif first_line.lower().find('abstract') != -1: # 尝试匹配 Abstract
                hasAbstract = True # 找到 ABSTRACT
                abstract = element.get_text()
                # 如果本元素内容过短则认为真正的摘要信息在下一元素
                if len(abstract) < 10: nextFlag = True
                else: break # end for element 
            elif len(list(element)) >= 5: # 否则如果是长行，则认为是摘要
                hasAbstract = True
                abstract += 'Abstract: \n' + element.get_text()
                break # end for element 
            elif LIMIT == elem_count: break # end for element 
            elem_count += 1
        break
    return abstract.replace('\n', '').encode('utf-8'), hasAbstract, elem_count

def extractAffiliation(pdf, elem_begin, elem_end):
    """ 根据作者单位可能所在的元素位置求出目标 pdf 中作者单位信息并返回

    :param pdf: 待处理的 pdf 文件url
    :param elem_begin: 作者单位可能所在的元素位置
    :param elem_end: 作者摘要所在元素的位置或查找摘要的上限位置
    :return: 作者单位信息
    """
    print('[Affiliation]')
    affiliation = ''
    elem_count = 0; hasAffiliation = True

    for page_layout in extract_pages(pdf, page_numbers=0):
        for element in page_layout:
            if not isinstance(element, LTTextContainer): continue

            if elem_count < elem_begin: 
                elem_count += 1
                continue
            elif elem_count == elem_end: # 到达边界 作者单位信息不存在
                hasAffiliation = False
                break # end for element
            else:
                affiliation += element.get_text()
                break # end for element
            elem_count += 1
        break # end for page_layout
    return hasAffiliation, affiliation.encode('utf-8')

def solvePDF(pdf_name):
    maxFontSize = findMaxFontSize(pdf_name)
    title, elem, line = extractTitle(pdf_name, maxFontSize)
    print(title)
    author = extractAuthor(pdf_name, elem + 1, line)
    pprint(author)
    abstract, hasAbstract, elemNum = extractAbstract(pdf_name, elem + 2)
    if hasAbstract: print(abstract)
    hasAffiliation, string = extractAffiliation(pdf_name, elem + 2, elemNum)
    if hasAffiliation: print(string)

if __name__ == "__main__":
    solvePDF(sys.argv[1])