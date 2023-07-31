import { HTMLElement, Node, NodeType, TextNode } from 'node-html-parser';
import { isBoolean, isUndefined } from '../utils';

/**
 * @description 获取元素
 * @param node
 * @param tagName
 * @param append
 * @returns
 */
const getElement = (
  node: HTMLElement,
  tagName: keyof HTMLElementTagNameMap,
  append: boolean
) => {
  // 子元素
  let child = node.querySelector(tagName);
  // 子元素不存在
  if (!child) {
    // 创建子元素
    child = createElement(node, tagName);
    // 插入元素
    insertElement(node, child, append);
  }
  return child;
};

/**
 * @description 插入换行节点
 * @param indent
 * @param node
 * @param childNode
 * @param append
 */
const insertLineNode = (
  node: HTMLElement,
  childNode: Node,
  append: boolean,
  indent: number
) => {
  // 换行文本
  const lineText = `\n${new Array(indent).fill(' ').join('')}`;
  // 插入换行节点
  if (childNode && childNode.nodeType === NodeType.TEXT_NODE) {
    if (childNode.innerText !== lineText) {
      // 换行节点
      const lineNode = new TextNode(lineText, node);
      node.exchangeChild(childNode, lineNode);
    }
  } else {
    // 换行节点
    const lineNode = new TextNode(lineText, node);
    append ? node.appendChild(lineNode) : node.childNodes.unshift(lineNode);
  }
};

/**
 * @description 插入元素
 * @param node
 * @param child
 * @param append
 */
const insertElement = (
  node: HTMLElement,
  child: HTMLElement,
  append: boolean
) => {
  // 默认缩进
  const defaultIndent = 2;
  // 前置缩进
  let preIndent = defaultIndent;
  // 父缩进
  let parentIndent = 0;
  // 前置节点
  const preNode = node.previousSibling;
  if (preNode && preNode.nodeType === NodeType.TEXT_NODE) {
    // 匹配缩进
    const matched = preNode.innerText.match('(?<=\n) *');
    if (matched) {
      // 缩进空格
      const [blanks] = matched;
      // 父缩进
      parentIndent = blanks.length;
      // 缩进
      preIndent = parentIndent + preIndent;
    }
  }
  if (append) {
    // 插入前置换行节点
    insertLineNode(node, node.lastChild, true, preIndent);
    node.appendChild(child);
    // 插入后置换行节点
    insertLineNode(node, node.lastChild, true, parentIndent);
  } else {
    // 插入后置换行节点
    insertLineNode(node, node.firstChild, false, parentIndent);
    node.childNodes.unshift(child);
    // 插入前置换行节点
    insertLineNode(node, node.firstChild, false, preIndent);
  }
};

/**
 * @description 创建元素
 * @param node
 * @param tagName
 * @param attrs
 * @returns
 */
const createElement = (
  node: HTMLElement,
  tagName: keyof HTMLElementTagNameMap,
  attrs?: Record<string, any>
) => {
  // 属性
  let attrsText = '';
  if (attrs) {
    attrsText = Object.entries(attrs)
      .map(([key, value]) =>
        isUndefined(value)
          ? ''
          : isBoolean(value)
          ? value
            ? `${key.toLowerCase()}`
            : ''
          : `${key.toLowerCase()}="${value}"`
      )
      .join(' ');
  }
  return new HTMLElement(tagName, {}, attrsText, node, [-1, -1]);
};

export { createElement, getElement, insertElement, insertLineNode };
