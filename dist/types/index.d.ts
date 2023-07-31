/**
 * @description link attributes
 */
interface LinkAttributes extends Partial<Pick<HTMLLinkElement, 'rel' | 'href' | 'type' | 'title' | 'as' | 'crossOrigin' | 'disabled' | 'hreflang' | 'media' | 'sizes' | 'referrerPolicy' | 'integrity'>> {
}
/**
 * @description script attributes
 */
interface ScriptAttributes extends Partial<Pick<HTMLScriptElement, 'type' | 'src' | 'defer' | 'async' | 'crossOrigin' | 'noModule' | 'nonce' | 'referrerPolicy' | 'integrity'>> {
    location?: 'head' | 'bodyStart' | 'bodyEnd';
}
/**
 * @description meta attributes
 */
interface MetaAttributes extends Partial<Pick<HTMLMetaElement, 'name' | 'content' | 'httpEquiv' | 'media'>> {
}
/**
 * @description plugin options
 */
interface HTMLTemplatePluginOptions {
    /**
     * @description html tempalte
     * @example
     * ```js
     * './index.html'
     * ```
     * @example
     * ```html
     * <html lang="en">
     *  <head>
     *    <meta charset="utf-8">
     *  </head>
     *  <body></body>
     * </html>
     * ```
     */
    template: string;
    /**
     * @description whether to inject bundled files or not
     * @default true
     * @example
     * ```js
     * true
     * ```
     * @example
     * ```js
     * // output [index.js]
     * {
     *   'index.js': true
     * }
     * ```
     * @example
     * ```js
     * // output [index.css]
     * {
     *   'index.css': {
     *     media: 'screen and (max-width: 600px)',
     *   }
     * }
     * ```
     */
    inject?: boolean | Record<string, boolean | LinkAttributes | ScriptAttributes>;
    /**
     * @description set the title of the output HTML document.
     * @example
     * ```js
     * // <title>rollup-plugin-create-html</title>
     * 'rollup-plugin-create-html'
     * ```
     */
    title?: string;
    /**
     * @description meta tag
     * @example
     * ```js
     * // <meta name="description" content="rollup-plugin-create-html"/>
     * {
     *   name: 'description'
     *   content: 'rollup-plugin-create-html',
     * }
     * ```
     * @example
     * ```js
     * [
     *  {
     *    name: 'description',
     *    content: 'rollup-plugin-create-html',
     *  }
     * ]
     * ```
     */
    meta?: MetaAttributes | MetaAttributes[];
    /**
     * @description link tag
     * @summary assets in the local path will be generated to the outDir, following the html file.
     * @example
     * ```js
     * // if filePath exsits <link href="/icon.png" rel="icon">,
     * // otherwise <link href="./images/icon.jpg" rel="icon">
     * {
     *   rel: 'icon',
     *   href: './images/icon.jpg'
     * }
     * ```
     * @example
     * ```js
     * // if filePath exsits <link href="/icon.png" rel="icon">,
     * // otherwise <link href="./images/icon.jpg" rel="icon">
     * [
     *  {
     *    rel: 'icon',
     *    href: './images/icon.jpg'
     *  }
     * ]
     * ```
     */
    link?: LinkAttributes | LinkAttributes[];
    /**
     * @description script tag
     * @example
     * ```js
     * // <head>
     * // <script src="index.js" type="module"></script>
     * // </head>
     * {
     *   src: './index.js',
     *   type: 'module'
     *   location: 'head'
     * }
     * ```
     * @example
     * ```js
     * [
     *  {
     *    rel: 'icon',
     *    href: './images/icon.jpg'
     *  }
     * ]
     * ```
     */
    script?: ScriptAttributes | ScriptAttributes[];
    /**
     * @description the fileName of the output html
     * @example
     * ```js
     * 'index.html'
     * ```
     */
    fileName?: string;
    /**
     * @description the prefix of injected link or script path
     */
    prefix?: string;
}
export { HTMLTemplatePluginOptions, LinkAttributes, MetaAttributes, ScriptAttributes, };
