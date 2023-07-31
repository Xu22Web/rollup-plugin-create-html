import { HTMLElement, Node } from 'node-html-parser';
/**
 * @description 获取元素
 * @param node
 * @param tagName
 * @param append
 * @returns
 */
declare const getElement: (node: HTMLElement, tagName: keyof HTMLElementTagNameMap, append: boolean) => HTMLElement;
/**
 * @description 插入换行节点
 * @param indent
 * @param node
 * @param childNode
 * @param append
 */
declare const insertLineNode: (node: HTMLElement, childNode: Node, append: boolean, indent: number) => void;
/**
 * @description 插入元素
 * @param node
 * @param child
 * @param append
 */
declare const insertElement: (node: HTMLElement, child: HTMLElement, append: boolean) => void;
/**
 * @description 创建元素
 * @param node
 * @param tagName
 * @param attrs
 * @returns
 */
declare const createElement: (node: HTMLElement, tagName: keyof HTMLElementTagNameMap, attrs?: Record<string, any>) => HTMLElement;
export { createElement, getElement, insertElement, insertLineNode };
