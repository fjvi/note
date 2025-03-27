/**
 * 通用图片代理脚本 - 全功能增强版
 * 在任何网页上自动将图片转为images.weserv.nl代理
 * 版本：4.0.0 - 全功能增强版（音乐播放器完美适配）
 */
(function() {
    // 配置项
    const config = {
        proxyPrefix: 'https://images.weserv.nl/?url=',
        processCssBackgrounds: true,   // 是否处理CSS背景图片
        processDynamicImages: true,    // 是否处理动态加载的图片
        processXHRFetch: true,         // 是否拦截XHR和Fetch请求
        preventDuplicateProcessing: true, // 防止重复处理同一URL
        monitorFrequency: 600,         // 常规监控间隔(毫秒)
        musicPlayerMonitorFrequency: 300, // 音乐播放器监控间隔(毫秒)
        debug: false,                  // 是否启用调试日志
        waitForDomContentLoaded: true, // 是否等待DOM加载完成再初始化部分功能
        enhanceMusicPlayers: true,     // 是否增强对音乐播放器的支持
        directPrototypesIntercept: true, // 是否直接拦截原型方法
        excludeDomains: [],            // 不处理的域名列表
        excludeSelectors: []           // 不处理的元素选择器列表
    };
    
    // 创建一个唯一的命名空间，避免与页面上其他脚本冲突
    window._imageProxyHandler = window._imageProxyHandler || {};
    
    // 如果已经运行过，就不再重复运行
    if (window._imageProxyHandler.initialized) {
        console.log('✅ 图片代理转换已经在运行中');
        return;
    }
    
    // 标记为已初始化
    window._imageProxyHandler.initialized = true;
    
    // 存储已处理过的URL，防止重复处理
    const processedUrls = new Set();
    
    // 当前网站的域名和协议
    const baseUrl = window.location.origin;
    const currentDomain = window.location.hostname;
    
    // 检查当前域名是否在排除列表中
    if (config.excludeDomains.includes(currentDomain)) {
        console.log(`⏭️ 跳过处理图片：${currentDomain} 在排除列表中`);
        return;
    }
    
    // 调试日志函数
    function debugLog(...args) {
        if (config.debug) {
            console.log('📸 [ImgProxy]', ...args);
        }
    }
    
    // 防抖函数，避免频繁执行某个操作
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    // 错误处理函数
    function safeExecute(fn, fallback = null, ...args) {
        try {
            return fn(...args);
        } catch (error) {
            debugLog('执行操作时出错:', error);
            return typeof fallback === 'function' ? fallback(...args) : fallback;
        }
    }
    
    // 安全地检查元素是否存在
    function safeCheckElement(element) {
        return element && typeof element === 'object';
    }
    
    // 检查文档是否准备好 - 确保不会出现DOM无法访问的问题
    function isDocumentReady() {
        return document && document.body;
    }
    
    // 初始化函数
    function initialize() {
        debugLog('初始化图片代理系统 - 全功能增强版');
        
        try {
            // DOM无关的拦截可以立即执行
            setupPrototypesIntercept();
            
            // 拦截Image对象 - 这不依赖于DOM
            safeExecute(interceptImageElement);
            
            // 拦截XHR和Fetch - 这不依赖于DOM
            if (config.processXHRFetch) {
                safeExecute(interceptXHRAndFetch);
            }
            
            // 等待DOM准备就绪后进行的操作
            const initDomDependentFeatures = () => {
                // 标记为DOM功能已初始化
                window._imageProxyHandler.domFeaturesInitialized = true;
                
                // 立即执行处理现有图片
                safeExecute(processExistingImages);
                
                // 如果启用了CSS背景处理，则处理背景图片
                if (config.processCssBackgrounds) {
                    setTimeout(() => safeExecute(interceptBackgroundImages), 500);
                    
                    // 定期检查内联样式，使用防抖函数减少性能开销
                    const debouncedProcessStyles = debounce(() => {
                        safeExecute(processInlineStyles);
                    }, 300);
                    
                    setInterval(debouncedProcessStyles, 1500);
                }
                
                // 如果启用了动态图片处理，设置DOM观察器
                if (config.processDynamicImages) {
                    safeExecute(setupImageObserver);
                }
                
                // 设置网站特定处理程序
                setupSiteSpecificHandlers();
                
                // 设置定期扫描
                setupPeriodicScans();
                
                console.log('✅ 通用图片代理转换已启用：所有图片将通过 images.weserv.nl 加载');
            };
            
            // 如果DOM尚未准备好并且配置要求等待DOM加载，则推迟初始化DOM相关功能
            if (!isDocumentReady() && config.waitForDomContentLoaded) {
                debugLog('DOM尚未加载完成，等待DOMContentLoaded事件');
                
                // 添加DOMContentLoaded事件监听器
                document.addEventListener('DOMContentLoaded', () => {
                    debugLog('DOM已加载，开始初始化DOM依赖功能');
                    initDomDependentFeatures();
                });
                
                // 设置一个备用的超时初始化，以防DOMContentLoaded已错过
                setTimeout(() => {
                    if (!window._imageProxyHandler.domFeaturesInitialized) {
                        debugLog('DOM加载超时，尝试强制初始化DOM依赖功能');
                        initDomDependentFeatures();
                    }
                }, 2000);
            } else {
                // 如果DOM已就绪或不需要等待，立即初始化DOM依赖功能
                initDomDependentFeatures();
            }
        } catch (error) {
            console.error('❌ 图片代理转换初始化失败:', error);
        }
    }
    
    // 设置原型拦截 - 在最早期拦截关键方法和属性
    function setupPrototypesIntercept() {
        if (!config.directPrototypesIntercept) return;
        
        debugLog('设置原型拦截');
        
        try {
            // 拦截HTMLImageElement.prototype.src属性
            if (HTMLImageElement && HTMLImageElement.prototype) {
                const originalSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
                if (originalSrcDescriptor && originalSrcDescriptor.configurable) {
                    Object.defineProperty(HTMLImageElement.prototype, 'src', {
                        get: originalSrcDescriptor.get,
                        set: function(url) {
                            if (url && typeof url === 'string' && 
                                !url.includes('images.weserv.nl') && 
                                !url.startsWith('data:') && 
                                !url.startsWith('blob:')) {
                                
                                // 保存原始URL
                                try {
                                    this.setAttribute('data-original-src', url);
                                } catch (e) {}
                                
                                // 设置代理URL
                                const proxyUrl = getProxyUrl(url);
                                processedUrls.add(url);
                                return originalSrcDescriptor.set.call(this, proxyUrl);
                            }
                            return originalSrcDescriptor.set.call(this, url);
                        },
                        configurable: true
                    });
                }
                
                // 同样拦截srcset属性
                if (Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'srcset')) {
                    const originalSrcsetDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'srcset');
                    if (originalSrcsetDescriptor && originalSrcsetDescriptor.configurable) {
                        Object.defineProperty(HTMLImageElement.prototype, 'srcset', {
                            get: originalSrcsetDescriptor.get,
                            set: function(srcset) {
                                if (srcset && typeof srcset === 'string' && !srcset.includes('images.weserv.nl')) {
                                    // 保存原始srcset
                                    try {
                                        this.setAttribute('data-original-srcset', srcset);
                                    } catch (e) {}
                                    
                                    // 处理srcset字符串
                                    const newSrcset = processSrcset(srcset);
                                    return originalSrcsetDescriptor.set.call(this, newSrcset);
                                }
                                return originalSrcsetDescriptor.set.call(this, srcset);
                            },
                            configurable: true
                        });
                    }
                }
            }
            
            // 拦截HTMLMediaElement.prototype.poster属性（用于video和audio元素）
            if (HTMLMediaElement && HTMLMediaElement.prototype) {
                const originalPosterDescriptor = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'poster');
                if (originalPosterDescriptor && originalPosterDescriptor.configurable) {
                    Object.defineProperty(HTMLMediaElement.prototype, 'poster', {
                        get: originalPosterDescriptor.get,
                        set: function(url) {
                            if (url && typeof url === 'string' && 
                                !url.includes('images.weserv.nl') && 
                                !url.startsWith('data:') && 
                                !url.startsWith('blob:')) {
                                
                                // 保存原始URL
                                try {
                                    this.setAttribute('data-original-poster', url);
                                } catch (e) {}
                                
                                // 设置代理URL
                                const proxyUrl = getProxyUrl(url);
                                processedUrls.add(url);
                                return originalPosterDescriptor.set.call(this, proxyUrl);
                            }
                            return originalPosterDescriptor.set.call(this, url);
                        },
                        configurable: true
                    });
                }
            }
            
            // 拦截appendChild和insertBefore方法
            if (Node && Node.prototype) {
                // 拦截appendChild
                const originalAppendChild = Node.prototype.appendChild;
                Node.prototype.appendChild = function(node) {
                    if (node && node.nodeName === 'IMG') {
                        processImageElement(node);
                    }
                    return originalAppendChild.call(this, node);
                };
                
                // 拦截insertBefore
                const originalInsertBefore = Node.prototype.insertBefore;
                Node.prototype.insertBefore = function(node, reference) {
                    if (node && node.nodeName === 'IMG') {
                        processImageElement(node);
                    }
                    return originalInsertBefore.call(this, node, reference);
                };
            }
            
            // 拦截innerHTML和outerHTML属性
            if (Element && Element.prototype) {
                // 拦截innerHTML
                const originalInnerHTMLDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
                if (originalInnerHTMLDescriptor && originalInnerHTMLDescriptor.configurable) {
                    Object.defineProperty(Element.prototype, 'innerHTML', {
                        get: originalInnerHTMLDescriptor.get,
                        set: function(html) {
                            // 设置HTML内容
                            const result = originalInnerHTMLDescriptor.set.call(this, html);
                            // 处理新添加的图片
                            setTimeout(() => {
                                processImagesInElement(this);
                            }, 0);
                            return result;
                        },
                        configurable: true
                    });
                }
                
                // 拦截outerHTML
                const originalOuterHTMLDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'outerHTML');
                if (originalOuterHTMLDescriptor && originalOuterHTMLDescriptor.configurable) {
                    Object.defineProperty(Element.prototype, 'outerHTML', {
                        get: originalOuterHTMLDescriptor.get,
                        set: function(html) {
                            // 保存父元素的引用
                            const parent = this.parentNode;
                            // 设置HTML内容
                            const result = originalOuterHTMLDescriptor.set.call(this, html);
                            // 处理新添加的图片
                            if (parent) {
                                setTimeout(() => {
                                    processImagesInElement(parent);
                                }, 0);
                            }
                            return result;
                        },
                        configurable: true
                    });
                }
            }
        } catch (error) {
            debugLog('设置原型拦截时出错:', error);
        }
    }
    
    // 处理元素内的所有图片
    function processImagesInElement(element) {
        if (!safeCheckElement(element)) return;
        
        try {
            const images = element.querySelectorAll('img');
            let count = 0;
            
            images.forEach(img => {
                if (processImageElement(img)) {
                    count++;
                }
            });
            
            // 处理视频/音频元素的poster属性
            const mediaElements = element.querySelectorAll('video, audio');
            mediaElements.forEach(media => {
                if (media.hasAttribute('poster')) {
                    const posterUrl = media.getAttribute('poster');
                    if (posterUrl && !posterUrl.includes('images.weserv.nl') && !posterUrl.startsWith('data:') && !posterUrl.startsWith('blob:')) {
                        if (config.preventDuplicateProcessing && processedUrls.has(posterUrl)) {
                            return;
                        }
                        
                        media.setAttribute('data-original-poster', posterUrl);
                        media.setAttribute('poster', getProxyUrl(posterUrl));
                        processedUrls.add(posterUrl);
                        count++;
                    }
                }
            });
            
            if (count > 0) {
                debugLog(`处理了${count}个元素内图片`);
            }
            
            return count;
        } catch (error) {
            debugLog('处理元素内图片时出错:', error);
            return 0;
        }
    }
    
    // 处理srcset字符串
    function processSrcset(srcset) {
        try {
            // 解析srcset字符串
            const srcsetParts = srcset.split(',').map(part => part.trim());
            const newSrcsetParts = srcsetParts.map(part => {
                const [url, descriptor] = part.split(/\s+/);
                if (url && !url.includes('images.weserv.nl') && !url.startsWith('data:') && !url.startsWith('blob:')) {
                    return `${getProxyUrl(url)} ${descriptor || ''}`.trim();
                }
                return part;
            });
            
            // 重新组合srcset字符串
            return newSrcsetParts.join(', ');
        } catch (error) {
            debugLog('处理srcset时出错:', error);
            return srcset;
        }
    }
    
    // 设置网站特定处理程序
    function setupSiteSpecificHandlers() {
        if (!isDocumentReady()) {
            debugLog('文档尚未准备好，跳过网站特定处理');
            return;
        }
        
        debugLog('设置网站特定处理程序');
        
        try {
            // 音乐播放网站
            if (config.enhanceMusicPlayers) {
                setupMusicPlayerObserver();
            }
            
            // 图片库/相册网站
            setupGalleryObserver();
            
            // 社交媒体网站
            setupSocialMediaObserver();
            
            // 电子商务网站
            setupEcommerceObserver();
            
            // 视频网站
            setupVideoSiteObserver();
        } catch (error) {
            debugLog('设置网站特定处理程序时出错:', error);
        }
    }
    
    // 设置定期扫描
    function setupPeriodicScans() {
        if (!isDocumentReady()) {
            debugLog('文档尚未准备好，跳过设置定期扫描');
            return;
        }
        
        debugLog('设置定期扫描');
        
        try {
            // 使用随机间隔，避免被检测为机器人
            const randomInterval = () => config.monitorFrequency + Math.random() * 400;
            
            // 定期扫描图片
            const imgScanInterval = setInterval(() => {
                if (isDocumentReady()) {
                    safeExecute(processExistingImages);
                }
            }, randomInterval());
            
            // 定期扫描懒加载图片
            const lazyScanInterval = setInterval(() => {
                if (isDocumentReady()) {
                    safeExecute(processLazyLoadImages);
                }
            }, randomInterval() * 1.5);
            
            // 定期扫描iframe内的图片
            const iframeScanInterval = setInterval(() => {
                if (isDocumentReady()) {
                    safeExecute(processIframeImages);
                }
            }, randomInterval() * 2);
            
            // 监听滚动事件，处理可见区域内的新图片，使用防抖减少频率
            const debouncedScrollHandler = debounce(() => {
                if (isDocumentReady()) {
                    safeExecute(processVisibleImages);
                }
            }, 200);
            
            // 安全地添加事件监听器
            try {
                window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
                window.addEventListener('resize', debouncedScrollHandler, { passive: true });
            } catch (e) {
                debugLog('添加滚动/调整大小事件监听器时出错:', e);
            }
            
            // 存储间隔以便清理
            window._imageProxyHandler.timers = window._imageProxyHandler.timers || [];
            window._imageProxyHandler.timers.push(imgScanInterval, lazyScanInterval, iframeScanInterval);
        } catch (error) {
            debugLog('设置定期扫描时出错:', error);
        }
    }
    
    // 检查元素是否应被跳过处理
    function shouldSkipElement(element) {
        if (!safeCheckElement(element)) return true;
        
        // 检查元素是否匹配排除选择器
        try {
            return config.excludeSelectors.some(selector => {
                try {
                    return element.matches && element.matches(selector);
                } catch (e) {
                    return false;
                }
            });
        } catch (e) {
            debugLog('检查元素是否应跳过时出错:', e);
            return true; // 发生错误时跳过处理
        }
    }
    
    // 使用DOM拦截处理现有图片
    function processExistingImages() {
        if (!isDocumentReady()) {
            debugLog('文档尚未准备好，跳过处理现有图片');
            return 0;
        }
        
        try {
            // 处理所有当前页面上的图片
            const images = document.querySelectorAll('img');
            let count = 0;
            
            images.forEach(img => {
                if (!shouldSkipElement(img) && processImageElement(img)) {
                    count++;
                }
            });
            
            // 处理视频/音频元素的poster属性
            const mediaElements = document.querySelectorAll('video, audio');
            mediaElements.forEach(media => {
                if (!shouldSkipElement(media) && media.hasAttribute('poster')) {
                    const posterUrl = media.getAttribute('poster');
                    if (posterUrl && !posterUrl.includes('images.weserv.nl') && !posterUrl.startsWith('data:') && !posterUrl.startsWith('blob:')) {
                        // 避免重复处理
                        if (config.preventDuplicateProcessing && processedUrls.has(posterUrl)) {
                            return;
                        }
                        
                        media.setAttribute('data-original-poster', posterUrl);
                        media.setAttribute('poster', getProxyUrl(posterUrl));
                        processedUrls.add(posterUrl);
                        count++;
                    }
                }
            });
            
            if (count > 0) {
                debugLog(`处理了${count}个现有图片和媒体元素`);
            }
            
            return count;
        } catch (e) {
            debugLog('处理现有图片时出错:', e);
            return 0;
        }
    }
    
    // 处理当前可见区域内的图片
    function processVisibleImages() {
        if (!isDocumentReady()) {
            debugLog('文档尚未准备好，跳过处理可见图片');
            return 0;
        }
        
        try {
            const windowHeight = window.innerHeight;
            const images = document.querySelectorAll('img:not([data-proxy-processed])');
            let count = 0;
            
            images.forEach(img => {
                try {
                    const rect = img.getBoundingClientRect();
                    // 图片在视口内或接近视口
                    if (rect.top < windowHeight + 300 && rect.bottom > -300) {
                        if (!shouldSkipElement(img) && processImageElement(img)) {
                            img.setAttribute('data-proxy-processed', 'true');
                            count++;
                        }
                    }
                } catch (e) {
                    debugLog('处理可见图片元素时出错:', e);
                }
            });
            
            if (count > 0) {
                debugLog(`处理了${count}个可见区域图片`);
            }
            
            return count;
        } catch (e) {
            debugLog('处理可见图片时出错:', e);
            return 0;
        }
    }
    
    // 处理懒加载图片
    function processLazyLoadImages() {
        if (!isDocumentReady()) {
            debugLog('文档尚未准备好，跳过处理懒加载图片');
            return 0;
        }
        
        try {
            // 常见的懒加载类名和属性
            const lazySelectors = [
                '[loading="lazy"]',
                '.lazyload', '.lazy', '.lazy-load', '.b-lazy',
                '[data-lazy]', '[data-lazyload]',
                '.js-lazy-image', '.js-lazy', '.js-lazyload',
                '[data-ll-status]', '[data-src]', '[data-original]'
            ];
            
            let selectors = '';
            try {
                selectors = lazySelectors.join(',');
            } catch (e) {
                debugLog('创建懒加载选择器时出错:', e);
                return 0;
            }
            
            const lazyImages = document.querySelectorAll(selectors);
            let count = 0;
            
            lazyImages.forEach(img => {
                try {
                    if (img.tagName === 'IMG' && !shouldSkipElement(img)) {
                        if (processImageElement(img)) {
                            count++;
                        }
                    } else if (img.style && img.style.backgroundImage && !shouldSkipElement(img)) {
                        if (processInlineBackground(img)) {
                            count++;
                        }
                    }
                } catch (e) {
                    debugLog('处理单个懒加载元素时出错:', e);
                }
            });
            
            if (count > 0) {
                debugLog(`处理了${count}个懒加载图片`);
            }
            
            return count;
        } catch (e) {
            debugLog('处理懒加载图片时出错:', e);
            return 0;
        }
    }
    
    // 处理iframe内的图片
    function processIframeImages() {
        if (!isDocumentReady()) {
            debugLog('文档尚未准备好，跳过处理iframe内图片');
            return 0;
        }
        
        try {
            const iframes = document.querySelectorAll('iframe');
            let count = 0;
            
            iframes.forEach(iframe => {
                try {
                    // 只处理同源iframe
                    if (iframe.contentDocument) {
                        const iframeImages = iframe.contentDocument.querySelectorAll('img');
                        iframeImages.forEach(img => {
                            try {
                                if (!shouldSkipElement(img) && processImageElement(img)) {
                                    count++;
                                }
                            } catch (e) {
                                debugLog('处理iframe内单个图片时出错:', e);
                            }
                        });
                        
                        // 处理iframe内的背景图片
                        if (config.processCssBackgrounds) {
                            try {
                                const elementsWithBg = iframe.contentDocument.querySelectorAll('[style*="background-image"]');
                                elementsWithBg.forEach(el => {
                                    try {
                                        if (!shouldSkipElement(el) && processInlineBackground(el)) {
                                            count++;
                                        }
                                    } catch (e) {
                                        debugLog('处理iframe内单个背景元素时出错:', e);
                                    }
                                });
                            } catch (e) {
                                debugLog('处理iframe内背景元素时出错:', e);
                            }
                        }
                    }
                } catch (e) {
                    // 跨域iframe无法访问内容，这是预期的错误，不处理
                }
            });
            
            if (count > 0) {
                debugLog(`处理了${count}个iframe内图片`);
            }
            
            return count;
        } catch (e) {
            debugLog('处理iframe内图片时出错:', e);
            return 0;
        }
    }
    
    // 处理图片元素
    function processImageElement(img) {
        if (!safeCheckElement(img)) return false;
        
        let processed = false;
        
        try {
            // 处理src属性
            if (img.src && !img.src.includes('images.weserv.nl') && !img.src.startsWith('data:') && !img.src.startsWith('blob:')) {
                const originalSrc = img.src;
                
                // 避免重复处理
                if (config.preventDuplicateProcessing && processedUrls.has(originalSrc)) {
                    return false;
                }
                
                // 保存原始URL
                try {
                    img.setAttribute('data-original-src', originalSrc);
                } catch (e) {}
                
                // 设置代理URL
                img.src = getProxyUrl(originalSrc);
                processedUrls.add(originalSrc);
                processed = true;
                debugLog('处理图片src:', originalSrc.substring(0, 50) + (originalSrc.length > 50 ? '...' : ''));
            }
            
            // 处理srcset属性
            if (img.hasAttribute('srcset') && !img.getAttribute('srcset').includes('images.weserv.nl')) {
                const originalSrcset = img.getAttribute('srcset');
                
                // 避免重复处理
                if (config.preventDuplicateProcessing && processedUrls.has('srcset:' + originalSrcset)) {
                    return processed;
                }
                
                try {
                    img.setAttribute('data-original-srcset', originalSrcset);
                } catch (e) {}
                
                const newSrcset = processSrcset(originalSrcset);
                img.setAttribute('srcset', newSrcset);
                processedUrls.add('srcset:' + originalSrcset);
                processed = true;
                debugLog('处理图片srcset');
            }
            
            // 处理懒加载属性
            const lazyAttributes = [
                'data-src', 'data-lazy-src', 'data-original', 'lazy-src', 
                'data-cover', 'data-thumbnail', 'data-image', 'data-bg',
                'data-srcset', 'data-defer-src', 'data-origin',
                'data-backdrop', 'data-url', 'data-high-res-src', 'data-low-res-src',
                'data-raw-src', 'data-img', 'data-src-retina'
            ];
            
            lazyAttributes.forEach(attr => {
                try {
                    if (img.hasAttribute(attr) && !img.hasAttribute(`data-original-${attr}`)) {
                        const originalValue = img.getAttribute(attr);
                        if (originalValue && !originalValue.includes('images.weserv.nl') && !originalValue.startsWith('data:') && !originalValue.startsWith('blob:')) {
                            // 避免重复处理
                            if (config.preventDuplicateProcessing && processedUrls.has(attr + ':' + originalValue)) {
                                return;
                            }
                            
                            try {
                                img.setAttribute(`data-original-${attr}`, originalValue);
                            } catch (e) {}
                            
                            img.setAttribute(attr, getProxyUrl(originalValue));
                            processedUrls.add(attr + ':' + originalValue);
                            processed = true;
                            debugLog(`处理图片${attr}:`, originalValue.substring(0, 50) + (originalValue.length > 50 ? '...' : ''));
                        }
                    }
                } catch (e) {
                    debugLog(`处理懒加载属性 ${attr} 时出错:`, e);
                }
            });
        } catch (error) {
            debugLog('处理图片元素时出错:', error);
        }
        
        return processed;
    }
    
    // 拦截Image对象的创建
    function interceptImageElement() {
        debugLog('拦截Image对象');
        
        try {
            // 保存原始Image构造函数
            const originalImage = window.Image;
            
            // 创建新的构造函数
            window.Image = function() {
                // 调用原始构造函数
                const img = new originalImage(...arguments);
                
                // 拦截src属性的设置
                try {
                    const originalDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
                    
                    if (originalDescriptor && originalDescriptor.configurable) {
                        // 由于HTMLImageElement.prototype.src已经被拦截，这里不需要再次拦截
                        // 但为了兼容性，我们仍然保留此代码，以防原型拦截失败
                        if (!config.directPrototypesIntercept) {
                            Object.defineProperty(img, 'src', {
                                get: originalDescriptor.get,
                                set: function(url) {
                                    // 如果不是代理URL且不是data URL，则转换为代理URL
                                    if (url && typeof url === 'string' && 
                                        !url.includes('images.weserv.nl') && 
                                        !url.startsWith('data:') && 
                                        !url.startsWith('blob:')) {
                                        
                                        // 避免重复处理
                                        if (config.preventDuplicateProcessing && processedUrls.has(url)) {
                                            originalDescriptor.set.call(this, url);
                                            return;
                                        }
                                        
                                        // 保存原始URL
                                        try {
                                            this.setAttribute('data-original-src', url);
                                        } catch (e) {}
                                        
                                        // 设置代理URL
                                        const proxyUrl = getProxyUrl(url);
                                        debugLog('拦截到新Image.src:', url.substring(0, 50) + (url.length > 50 ? '...' : ''));
                                        processedUrls.add(url);
                                        originalDescriptor.set.call(this, proxyUrl);
                                    } else {
                                        originalDescriptor.set.call(this, url);
                                    }
                                },
                                configurable: true
                            });
                        }
                    }
                } catch (e) {
                    debugLog('设置Image实例src拦截时出错:', e);
                }
                
                return img;
            };
            
            // 确保继承原型链
            window.Image.prototype = originalImage.prototype;
            window.Image.prototype.constructor = window.Image;
        } catch (error) {
            debugLog('拦截Image对象时出错:', error);
        }
    }
    
    // 拦截XHR和Fetch请求
    function interceptXHRAndFetch() {
        debugLog('拦截XHR和Fetch请求');
        
        try {
            // 拦截XMLHttpRequest
            const originalXHROpen = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function(method, url, ...rest) {
                // 只拦截GET请求，且URL看起来像图片
                if (method.toUpperCase() === 'GET' && typeof url === 'string' && isImageUrl(url)) {
                    if (!url.includes('images.weserv.nl') && !url.startsWith('data:') && !url.startsWith('blob:')) {
                        const proxyUrl = getProxyUrl(url);
                        debugLog('拦截XHR图片请求:', url.substring(0, 50) + (url.length > 50 ? '...' : ''));
                        return originalXHROpen.call(this, method, proxyUrl, ...rest);
                    }
                }
                return originalXHROpen.call(this, method, url, ...rest);
            };
            
            // 拦截Fetch API
            const originalFetch = window.fetch;
            window.fetch = function(resource, init = {}) {
                if (typeof resource === 'string' && isImageUrl(resource) && 
                    (!init.method || init.method.toUpperCase() === 'GET') &&
                    !resource.includes('images.weserv.nl') && 
                    !resource.startsWith('data:') && 
                    !resource.startsWith('blob:')) {
                    
                    const proxyUrl = getProxyUrl(resource);
                    debugLog('拦截Fetch图片请求:', resource.substring(0, 50) + (resource.length > 50 ? '...' : ''));
                    return originalFetch.call(this, proxyUrl, init);
                }
                return originalFetch.call(this, resource, init);
            };
        } catch (error) {
            debugLog('拦截XHR和Fetch请求时出错:', error);
        }
    }
    
    // 判断URL是否为图片URL
    function isImageUrl(url) {
        if (!url || typeof url !== 'string') return false;
        
        // 检查是否以常见图片扩展名结尾
        const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg|ico|tiff|avif|heic)($|\?)/i;
        
        // 检查URL路径部分
        try {
            const urlObj = new URL(url, window.location.href);
            return imageExtensions.test(urlObj.pathname) || 
                   urlObj.pathname.includes('/image') || 
                   urlObj.pathname.includes('/img/') ||
                   urlObj.search.includes('image') ||
                   urlObj.pathname.includes('/avatar/') ||
                   urlObj.pathname.includes('/thumb');
        } catch (e) {
            // 如果URL解析失败，直接检查字符串
            return imageExtensions.test(url) || 
                   url.includes('/image') || 
                   url.includes('/img/') ||
                   url.includes('image') ||
                   url.includes('/avatar/') ||
                   url.includes('/thumb');
        }
    }
    
    // 拦截CSS背景图片
    function interceptBackgroundImages() {
        if (!isDocumentReady()) {
            debugLog('文档尚未准备好，跳过拦截CSS背景图片');
            return;
        }
        
        debugLog('拦截CSS背景图片');
        
        try {
            // 创建一个样式元素，用于覆盖现有的背景图片
            const styleEl = document.createElement('style');
            styleEl.id = 'weserv-bg-interceptor';
            styleEl.setAttribute('type', 'text/css');
            document.head.appendChild(styleEl);
            
            // 获取所有样式表
            const styleSheets = Array.from(document.styleSheets || []);
            
            // 处理每个样式表
            styleSheets.forEach(sheet => {
                try {
                    // 跳过跨域样式表
                    if (sheet.href && new URL(sheet.href).origin !== window.location.origin) {
                        return;
                    }
                    
                    // 获取所有CSS规则
                    const rules = Array.from(sheet.cssRules || sheet.rules || []);
                    processRules(rules, styleEl.sheet);
                } catch (e) {
                    // 跳过有访问限制的样式表
                    debugLog('无法访问样式表', e);
                }
            });
            
            // 处理内联样式
            processInlineStyles();
        } catch (error) {
            debugLog('拦截CSS背景图片时出错:', error);
        }
    }
    
    // 处理CSS规则
    function processRules(rules, targetSheet) {
        if (!rules || !targetSheet) return;
        
        rules.forEach(rule => {
            try {
                // 处理样式规则
                if (rule.type === 1) { // CSSStyleRule
                    const bgImage = rule.style && rule.style.backgroundImage;
                    if (bgImage && bgImage !== 'none' && !bgImage.includes('images.weserv.nl') && !bgImage.startsWith('data:')) {
                        // 提取URL
                        const matches = bgImage.match(/url\(['"]?(.*?)['"]?\)/gi);
                        if (matches) {
                            let newBgImage = bgImage;
                            let changed = false;
                            
                            matches.forEach(match => {
                                const urlMatch = match.match(/url\(['"]?(.*?)['"]?\)/i);
                                if (urlMatch && urlMatch[1]) {
                                    const originalUrl = urlMatch[1];
                                    
                                    if (!originalUrl.includes('images.weserv.nl') && !originalUrl.startsWith('data:') && !originalUrl.startsWith('blob:')) {
                                        const proxyUrl = getProxyUrl(originalUrl);
                                        newBgImage = newBgImage.replace(match, `url("${proxyUrl}")`);
                                        changed = true;
                                    }
                                }
                            });
                            
                            // 只有当背景图片实际改变时才添加规则
                            if (changed) {
                                try {
                                    const newRule = `${rule.selectorText} { background-image: ${newBgImage} !important; }`;
                                    targetSheet.insertRule(newRule, targetSheet.cssRules.length);
                                } catch (e) {
                                    debugLog('添加CSS规则时出错:', e);
                                }
                            }
                        }
                    }
                }
                // 处理@media规则
                else if (rule.type === 4) { // CSSMediaRule
                    processRules(Array.from(rule.cssRules || []), targetSheet);
                }
                // 处理@import规则
                else if (rule.type === 3) { // CSSImportRule
                    // 尝试处理导入的样式表
                    try {
                        if (rule.styleSheet) {
                            processRules(Array.from(rule.styleSheet.cssRules || []), targetSheet);
                        }
                    } catch (e) {
                        debugLog('无法访问导入的样式表', e);
                    }
                }
                // 处理@keyframes规则
                else if (rule.type === 7) { // CSSKeyframesRule
                    try {
                        const keyframesRules = Array.from(rule.cssRules || []);
                        keyframesRules.forEach(keyframeRule => {
                            if (keyframeRule.style && keyframeRule.style.backgroundImage) {
                                const bgImage = keyframeRule.style.backgroundImage;
                                if (bgImage && bgImage !== 'none' && !bgImage.includes('images.weserv.nl') && !bgImage.startsWith('data:')) {
                                    // 提取并处理URL，类似于处理普通规则
                                    const matches = bgImage.match(/url\(['"]?(.*?)['"]?\)/gi);
                                    if (matches) {
                                        let newBgImage = bgImage;
                                        let changed = false;
                                        
                                        matches.forEach(match => {
                                            const urlMatch = match.match(/url\(['"]?(.*?)['"]?\)/i);
                                            if (urlMatch && urlMatch[1]) {
                                                const originalUrl = urlMatch[1];
                                                if (!originalUrl.includes('images.weserv.nl') && !originalUrl.startsWith('data:')) {
                                                    const proxyUrl = getProxyUrl(originalUrl);
                                                    newBgImage = newBgImage.replace(match, `url("${proxyUrl}")`);
                                                    changed = true;
                                                }
                                            }
                                        });
                                        
                                        if (changed) {
                                            // 无法直接修改keyframe规则，所以我们为其创建一个覆盖
                                            const keyframeSelector = keyframeRule.keyText; // 如 "0%", "100%"
                                            const newRule = `@keyframes ${rule.name} { ${keyframeSelector} { background-image: ${newBgImage} !important; } }`;
                                            try {
                                                targetSheet.insertRule(newRule, targetSheet.cssRules.length);
                                            } catch (e) {
                                                debugLog('添加keyframe覆盖规则时出错:', e);
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    } catch (e) {
                        debugLog('处理@keyframes规则时出错:', e);
                    }
                }
            } catch (e) {
                debugLog('处理CSS规则时出错:', e);
            }
        });
    }
    
    // 处理内联样式
    function processInlineStyles() {
        if (!isDocumentReady()) {
            debugLog('文档尚未准备好，跳过处理内联样式');
            return 0;
        }
        
        try {
            const elements = document.querySelectorAll('[style*="background-image"]');
            let count = 0;
            
            elements.forEach(el => {
                try {
                    if (shouldSkipElement(el)) return;
                    
                    if (processInlineBackground(el)) {
                        count++;
                    }
                } catch (e) {
                    debugLog('处理单个内联样式元素时出错:', e);
                }
            });
            
            if (count > 0) {
                debugLog(`处理了${count}个内联背景样式`);
            }
            
            return count;
        } catch (e) {
            debugLog('处理内联样式时出错:', e);
            return 0;
        }
    }
    
    // 处理单个元素的内联背景
    function processInlineBackground(el) {
        if (!safeCheckElement(el) || !el.style) return false;
        
        try {
            const style = el.style.backgroundImage;
            if (!style || style === 'none' || style.includes('images.weserv.nl') || style.startsWith('data:') || style.startsWith('blob:')) {
                return false;
            }
            
            // 提取URL
            const matches = style.match(/url\(['"]?(.*?)['"]?\)/i);
            if (matches && matches[1]) {
                const originalUrl = matches[1];
                
                // 避免重复处理
                if (config.preventDuplicateProcessing && processedUrls.has('bg:' + originalUrl)) {
                    return false;
                }
                
                if (!originalUrl.includes('images.weserv.nl') && !originalUrl.startsWith('data:') && !originalUrl.startsWith('blob:')) {
                    const proxyUrl = getProxyUrl(originalUrl);
                    
                    // 只有在URL确实改变时才修改
                    if (originalUrl !== proxyUrl) {
                        el.style.backgroundImage = `url("${proxyUrl}")`;
                        processedUrls.add('bg:' + originalUrl);
                        debugLog('处理元素背景图片:', originalUrl.substring(0, 50) + (originalUrl.length > 50 ? '...' : ''));
                        return true;
                    }
                }
            }
        } catch (error) {
            debugLog('处理内联背景时出错:', error);
        }
        
        return false;
    }
    
    // 专门针对音乐播放器的观察器
    function setupMusicPlayerObserver() {
        if (!isDocumentReady()) {
            debugLog('文档尚未准备好，跳过设置音乐播放器观察器');
            return;
        }
        
        debugLog('设置音乐播放器观察器');
        
        // 检测页面是否为音乐网站 - 安全地访问DOM
        let isMusicSite = false;
        try {
            const pageText = (document.title || '') + ' ' + (window.location.hostname || '') + ' ';
            const bodyText = document.body ? document.body.textContent || '' : '';
            isMusicSite = /(music|song|audio|player|spotify|pandora|deezer|tidal|soundcloud|bandcamp)/i.test(
                pageText + bodyText
            ) || Boolean(document.getElementById('audio-player'));
            
            // 检查是否存在音乐播放器相关元素
            const musicPlayerElements = document.querySelectorAll('#audio-player, #cover-art, .cover-art, .album-cover, audio, .player');
            if (musicPlayerElements.length > 0) {
                isMusicSite = true;
            }
        } catch (e) {
            debugLog('检测音乐网站时出错:', e);
            isMusicSite = false;
        }
        
        // 检查是否存在songs数组，这是很多音乐播放器的常见变量
        let hasSongsArray = false;
        try {
            hasSongsArray = window.songs && Array.isArray(window.songs);
        } catch (e) {
            debugLog('检查songs数组时出错:', e);
            hasSongsArray = false;
        }
        
        // 如果是音乐站点或存在songs数组，使用更高频率的监控
        const checkInterval = (isMusicSite || hasSongsArray) ? config.musicPlayerMonitorFrequency : config.monitorFrequency;
        
        debugLog(`音乐播放器监控间隔: ${checkInterval}ms (${isMusicSite ? '音乐站点' : '非音乐站点'}, ${hasSongsArray ? '有songs数组' : '无songs数组'})`);
        
        // 定期检查常见的播放器元素
        const playerObserver = setInterval(() => {
            try {
                if (!isDocumentReady()) return;
                
                // 首先处理全局songs数组（这很重要，因为很多播放器直接从这个数组加载封面）
                try {
                    if (window.songs && Array.isArray(window.songs)) {
                        let songProcessed = 0;
                        
                        window.songs.forEach(song => {
                            if (song && song.cover && typeof song.cover === 'string' && 
                                !song.cover.includes('images.weserv.nl') && 
                                !song.cover.startsWith('data:') && 
                                !song.cover.startsWith('blob:')) {
                                
                                // 如果歌曲封面URL尚未被处理，则处理它
                                if (!song._originalCover) {
                                    song._originalCover = song.cover;
                                    song.cover = getProxyUrl(song.cover);
                                    songProcessed++;
                                    debugLog('处理songs数组中的封面:', song._originalCover.substring(0, 50) + (song._originalCover.length > 50 ? '...' : ''));
                                }
                            }
                        });
                        
                        if (songProcessed > 0) {
                            debugLog(`处理了${songProcessed}个songs数组项`);
                        }
                    }
                } catch (e) {
                    debugLog('处理songs数组时出错:', e);
                }
                
                // 处理音乐播放器常见的封面元素
                const coverSelectors = [
                    '#cover-art', '.cover-art', '.album-cover', '.song-cover', 
                    '.player-cover', '.cd-cover', '.album-img', '.music-cover',
                    '[class*="cover"]', '[class*="artwork"]', '[class*="album"]',
                    '[id*="cover"]', '[id*="artwork"]', '[id*="album"]',
                    '.aplayer-pic', '.aplayer-cover', '.music-player-cover',
                    'audio[poster]', 'video[poster]', '.track-cover',
                    '.jp-cover', '.now-playing-cover', '.playing-cover',
                    '.musicInfo-cover', '[data-testid="cover-art-image"]',
                    '.cover-art-image', '.playlist-item-cover img'
                ];
                
                // 安全地构建选择器字符串
                let selectors = '';
                try {
                    selectors = coverSelectors.join(',');
                } catch (e) {
                    debugLog('创建音乐播放器选择器时出错:', e);
                    return;
                }
                
                const coverElements = document.querySelectorAll(selectors);
                let count = 0;
                
                coverElements.forEach(el => {
                    try {
                        if (shouldSkipElement(el)) return;
                        
                        // 处理图片元素
                        if (el.tagName === 'IMG') {
                            // 强制处理封面图片，即使它已经被处理过
                            if (el.src && !el.src.includes('images.weserv.nl') && !el.src.startsWith('data:') && !el.src.startsWith('blob:')) {
                                const originalSrc = el.src;
                                el.setAttribute('data-original-src', originalSrc);
                                el.src = getProxyUrl(originalSrc);
                                debugLog('处理音乐封面:', originalSrc.substring(0, 50) + (originalSrc.length > 50 ? '...' : ''));
                                count++;
                            }
                        }
                        // 处理元素背景
                        else if (el.style && el.style.backgroundImage) {
                            if (processInlineBackground(el)) {
                                count++;
                            }
                        }
                        
                        // 处理poster属性 (用于audio/video元素)
                        if (el.hasAttribute('poster') && !el.hasAttribute('data-original-poster')) {
                            const posterUrl = el.getAttribute('poster');
                            if (posterUrl && !posterUrl.includes('images.weserv.nl') && !posterUrl.startsWith('data:') && !posterUrl.startsWith('blob:')) {
                                // 避免重复处理
                                if (config.preventDuplicateProcessing && processedUrls.has('poster:' + posterUrl)) {
                                    return;
                                }
                                
                                el.setAttribute('data-original-poster', posterUrl);
                                el.setAttribute('poster', getProxyUrl(posterUrl));
                                processedUrls.add('poster:' + posterUrl);
                                count++;
                                debugLog('处理播放器封面(poster):', posterUrl.substring(0, 50) + (posterUrl.length > 50 ? '...' : ''));
                            }
                        }
                        
                        // 处理子元素中的图片
                        const coverImages = el.querySelectorAll('img');
                        coverImages.forEach(img => {
                            try {
                                if (!shouldSkipElement(img) && img.src && !img.src.includes('images.weserv.nl') && !img.src.startsWith('data:') && !img.src.startsWith('blob:')) {
                                    const originalSrc = img.src;
                                    img.setAttribute('data-original-src', originalSrc);
                                    img.src = getProxyUrl(originalSrc);
                                    debugLog('处理音乐封面子元素:', originalSrc.substring(0, 50) + (originalSrc.length > 50 ? '...' : ''));
                                    count++;
                                }
                            } catch (e) {
                                debugLog('处理音乐封面子元素时出错:', e);
                            }
                        });
                    } catch (e) {
                        debugLog('处理音乐播放器元素时出错:', e);
                    }
                });
                
                // 处理正在播放中的歌曲元素
                const playingSelectors = [
                    '.playing', '.active', '.current', '[data-playing="true"]',
                    '[aria-current="true"]', '.now-playing', '.is-playing',
                    '.playlist-item.active', '.song-item.active'
                ];
                
                // 安全地构建选择器字符串
                let playingSelector = '';
                try {
                    playingSelector = playingSelectors.join(',');
                } catch (e) {
                    debugLog('创建播放中选择器时出错:', e);
                    return;
                }
                
                const playingElements = document.querySelectorAll(playingSelector);
                let playingProcessed = 0;
                
                playingElements.forEach(element => {
                    try {
                        // 处理播放中元素内的图片
                        const images = element.querySelectorAll('img');
                        images.forEach(img => {
                            try {
                                if (!shouldSkipElement(img) && img.src && !img.src.includes('images.weserv.nl') && !img.src.startsWith('data:') && !img.src.startsWith('blob:')) {
                                    const originalSrc = img.src;
                                    img.setAttribute('data-original-src', originalSrc);
                                    img.src = getProxyUrl(originalSrc);
                                    playingProcessed++;
                                    debugLog('处理播放中元素图片:', originalSrc.substring(0, 50) + (originalSrc.length > 50 ? '...' : ''));
                                }
                            } catch (e) {
                                debugLog('处理播放中元素内图片时出错:', e);
                            }
                        });
                        
                        // 处理播放中元素的背景图片
                        if (element.style && element.style.backgroundImage) {
                            if (processInlineBackground(element)) {
                                playingProcessed++;
                            }
                        }
                    } catch (e) {
                        debugLog('处理播放中元素时出错:', e);
                    }
                });
                
                if (count > 0 || playingProcessed > 0) {
                    debugLog(`处理了${count}个音乐封面和${playingProcessed}个播放中元素图片`);
                }
            } catch (error) {
                debugLog('音乐播放器监视器运行时出错:', error);
            }
        }, checkInterval);
        
        // 存储定时器，便于清理
        window._imageProxyHandler.timers = window._imageProxyHandler.timers || [];
        window._imageProxyHandler.timers.push(playerObserver);
    }
    
    // 为图片库/相册网站设置观察器
    function setupGalleryObserver() {
        if (!isDocumentReady()) {
            debugLog('文档尚未准备好，跳过设置图片库观察器');
            return;
        }
        
        debugLog('设置图片库观察器');
        
        // 检测页面是否为图库类型 - 安全地访问DOM
        let isGallerySite = false;
        try {
            const pageText = (document.title || '') + ' ' + (window.location.hostname || '') + ' ';
            const bodyText = document.body ? document.body.textContent || '' : '';
            isGallerySite = /(gallery|album|photo|image|picture|slide|carousel)/i.test(
                pageText + bodyText
            );
        } catch (e) {
            debugLog('检测图库网站时出错:', e);
            isGallerySite = false;
        }
        
        // 如果是图库类型，使用更高频率检查
        const checkInterval = isGallerySite ? config.monitorFrequency / 2 : config.monitorFrequency;
        
        // 定期检查常见的相册/轮播图元素
        const galleryObserver = setInterval(() => {
            try {
                if (!isDocumentReady()) return;
                
                const gallerySelectors = [
                    '.gallery', '.carousel', '.slider', '.slideshow', '.album',
                    '[class*="gallery"]', '[class*="carousel"]', '[class*="slider"]',
                    '[id*="gallery"]', '[id*="carousel"]', '[id*="slider"]',
                    '.img-container', '.photo-container', '.picture-container',
                    '.swiper-slide', '.slide-item', '.thumbnail',
                    '[role="listbox"]', '[role="slider"]', '[role="tabpanel"]'
                ];
                
                // 安全地构建选择器字符串
                let selectors = '';
                try {
                    selectors = gallerySelectors.join(',');
                } catch (e) {
                    debugLog('创建图库选择器时出错:', e);
                    return;
                }
                
                const galleryElements = document.querySelectorAll(selectors);
                let count = 0;
                
                galleryElements.forEach(gallery => {
                    try {
                        // 处理画廊背景
                        if (gallery.style && gallery.style.backgroundImage && !shouldSkipElement(gallery)) {
                            if (processInlineBackground(gallery)) {
                                count++;
                            }
                        }
                        
                        // 处理画廊内的所有图片
                        const images = gallery.querySelectorAll('img');
                        images.forEach(img => {
                            try {
                                if (!shouldSkipElement(img) && processImageElement(img)) {
                                    count++;
                                }
                            } catch (e) {
                                debugLog('处理图库内图片时出错:', e);
                            }
                        });
                        
                        // 处理画廊内的背景图片元素
                        const bgElements = gallery.querySelectorAll('[style*="background-image"]');
                        bgElements.forEach(el => {
                            try {
                                if (!shouldSkipElement(el) && processInlineBackground(el)) {
                                    count++;
                                }
                            } catch (e) {
                                debugLog('处理图库内背景元素时出错:', e);
                            }
                        });
                    } catch (e) {
                        debugLog('处理图库元素时出错:', e);
                    }
                });
                
                if (count > 0) {
                    debugLog(`处理了${count}个图库元素`);
                }
            } catch (error) {
                debugLog('处理图库元素时出错:', error);
            }
        }, checkInterval);
        
        // 存储定时器，便于清理
        window._imageProxyHandler.timers = window._imageProxyHandler.timers || [];
        window._imageProxyHandler.timers.push(galleryObserver);
    }
    
    // 为社交媒体网站设置观察器
    function setupSocialMediaObserver() {
        if (!isDocumentReady()) {
            debugLog('文档尚未准备好，跳过设置社交媒体观察器');
            return;
        }
        
        debugLog('设置社交媒体观察器');
        
        // 检测页面是否为社交媒体
        const isSocialSite = /(facebook|twitter|instagram|linkedin|pinterest|reddit|tumblr|weibo|wechat|qq|tiktok)/i.test(
            window.location.hostname || ''
        );
        
        // 如果是社交媒体，使用更高频率检查
        const checkInterval = isSocialSite ? config.monitorFrequency / 2 : config.monitorFrequency;
        
        // 定期检查社交媒体特有元素
        const socialObserver = setInterval(() => {
            try {
                if (!isDocumentReady()) return;
                
                const socialSelectors = [
                    '.avatar', '.profile-pic', '.profile-image', '.user-avatar',
                    '[class*="avatar"]', '[class*="profile"]', '[class*="user-pic"]',
                    '.post-image', '.tweet-image', '.status-image',
                    '.story-image', '.feed-item-image', '.timeline-image',
                    '.attachment', '.media-attachment', '.preview-image'
                ];
                
                // 安全地构建选择器字符串
                let selectors = '';
                try {
                    selectors = socialSelectors.join(',');
                } catch (e) {
                    debugLog('创建社交媒体选择器时出错:', e);
                    return;
                }
                
                const socialElements = document.querySelectorAll(selectors);
                let count = 0;
                
                socialElements.forEach(el => {
                    try {
                        // 处理元素背景
                        if (el.style && el.style.backgroundImage && !shouldSkipElement(el)) {
                            if (processInlineBackground(el)) {
                                count++;
                            }
                        }
                        
                        // 如果是图片元素
                        if (el.tagName === 'IMG' && !shouldSkipElement(el)) {
                            if (processImageElement(el)) {
                                count++;
                            }
                        }
                        
                        // 处理子元素内的图片
                        const childImages = el.querySelectorAll('img');
                        childImages.forEach(img => {
                            try {
                                if (!shouldSkipElement(img) && processImageElement(img)) {
                                    count++;
                                }
                            } catch (e) {
                                debugLog('处理社交媒体内图片时出错:', e);
                            }
                        });
                    } catch (e) {
                        debugLog('处理社交媒体元素时出错:', e);
                    }
                });
                
                if (count > 0) {
                    debugLog(`处理了${count}个社交媒体元素`);
                }
            } catch (error) {
                debugLog('处理社交媒体元素时出错:', error);
            }
        }, checkInterval);
        
        // 存储定时器，便于清理
        window._imageProxyHandler.timers = window._imageProxyHandler.timers || [];
        window._imageProxyHandler.timers.push(socialObserver);
    }
    
    // 为电子商务网站设置观察器
    function setupEcommerceObserver() {
        if (!isDocumentReady()) {
            debugLog('文档尚未准备好，跳过设置电子商务观察器');
            return;
        }
        
        debugLog('设置电子商务观察器');
        
        // 检测页面是否为电商网站 - 安全地访问DOM
        let isEcommerceSite = false;
        try {
            const pageText = (document.title || '') + ' ' + (window.location.hostname || '') + ' ';
            const bodyText = document.body ? document.body.textContent || '' : '';
            isEcommerceSite = /(shop|store|mall|product|buy|cart|checkout|price|order)/i.test(
                pageText + bodyText
            );
        } catch (e) {
            debugLog('检测电商网站时出错:', e);
            isEcommerceSite = false;
        }
        
        // 如果是电商网站，使用更高频率检查
        const checkInterval = isEcommerceSite ? config.monitorFrequency / 2 : config.monitorFrequency;
        
        // 定期检查电商特有元素
        const ecommerceObserver = setInterval(() => {
            try {
                if (!isDocumentReady()) return;
                
                const ecommerceSelectors = [
                    '.product-image', '.item-image', '.goods-image',
                    '[class*="product"]', '[class*="item-img"]', '[class*="goods-img"]',
                    '.thumbnail', '.preview', '.showcase',
                    '.cart-item-image', '.shop-item-image', '.merchandise-image',
                    '.catalog-image', '.zoom-image', '.magnify-image'
                ];
                
                // 安全地构建选择器字符串
                let selectors = '';
                try {
                    selectors = ecommerceSelectors.join(',');
                } catch (e) {
                    debugLog('创建电商选择器时出错:', e);
                    return;
                }
                
                const ecommerceElements = document.querySelectorAll(selectors);
                let count = 0;
                
                ecommerceElements.forEach(el => {
                    try {
                        // 处理元素背景
                        if (el.style && el.style.backgroundImage && !shouldSkipElement(el)) {
                            if (processInlineBackground(el)) {
                                count++;
                            }
                        }
                        
                        // 如果是图片元素
                        if (el.tagName === 'IMG' && !shouldSkipElement(el)) {
                            if (processImageElement(el)) {
                                count++;
                            }
                        }
                        
                        // 处理子元素内的图片
                        const childImages = el.querySelectorAll('img');
                        childImages.forEach(img => {
                            try {
                                if (!shouldSkipElement(img) && processImageElement(img)) {
                                    count++;
                                }
                            } catch (e) {
                                debugLog('处理电商内图片时出错:', e);
                            }
                        });
                    } catch (e) {
                        debugLog('处理电商元素时出错:', e);
                    }
                });
                
                if (count > 0) {
                    debugLog(`处理了${count}个电商元素`);
                }
            } catch (error) {
                debugLog('处理电商元素时出错:', error);
            }
        }, checkInterval);
        
        // 存储定时器，便于清理
        window._imageProxyHandler.timers = window._imageProxyHandler.timers || [];
        window._imageProxyHandler.timers.push(ecommerceObserver);
    }
    
    // 为视频网站设置观察器
    function setupVideoSiteObserver() {
        if (!isDocumentReady()) {
            debugLog('文档尚未准备好，跳过设置视频网站观察器');
            return;
        }
        
        debugLog('设置视频网站观察器');
        
        // 检测页面是否为视频网站 - 安全地访问DOM
        let isVideoSite = false;
        try {
            const pageText = (document.title || '') + ' ' + (window.location.hostname || '') + ' ';
            const bodyText = document.body ? document.body.textContent || '' : '';
            isVideoSite = /(video|movie|film|tv|show|episode|stream|watch|youtube|vimeo|bilibili)/i.test(
                pageText + bodyText
            );
        } catch (e) {
            debugLog('检测视频网站时出错:', e);
            isVideoSite = false;
        }
        
        // 如果是视频网站，使用更高频率检查
        const checkInterval = isVideoSite ? config.monitorFrequency / 2 : config.monitorFrequency;
        
        // 定期检查视频网站特有元素
        const videoObserver = setInterval(() => {
            try {
                if (!isDocumentReady()) return;
                
                const videoSelectors = [
                    '.thumbnail', '.preview', '.poster', '.video-thumbnail',
                    '[class*="thumbnail"]', '[class*="poster"]', '[class*="preview"]',
                    '.episode-image', '.movie-cover', '.video-cover',
                    'video[poster]', '.recommend-cover', '.related-video-image',
                    '.channel-image', '.playlist-thumbnail'
                ];
                
                // 安全地构建选择器字符串
                let selectors = '';
                try {
                    selectors = videoSelectors.join(',');
                } catch (e) {
                    debugLog('创建视频网站选择器时出错:', e);
                    return;
                }
                
                const videoElements = document.querySelectorAll(selectors);
                let count = 0;
                
                videoElements.forEach(el => {
                    try {
                        // 处理poster属性
                        if (el.hasAttribute('poster') && !el.hasAttribute('data-original-poster') && !shouldSkipElement(el)) {
                            const posterUrl = el.getAttribute('poster');
                            if (posterUrl && !posterUrl.includes('images.weserv.nl') && !posterUrl.startsWith('data:') && !posterUrl.startsWith('blob:')) {
                                // 避免重复处理
                                if (config.preventDuplicateProcessing && processedUrls.has('poster:' + posterUrl)) {
                                    return;
                                }
                                
                                el.setAttribute('data-original-poster', posterUrl);
                                el.setAttribute('poster', getProxyUrl(posterUrl));
                                processedUrls.add('poster:' + posterUrl);
                                count++;
                                debugLog('处理视频海报:', posterUrl.substring(0, 50) + (posterUrl.length > 50 ? '...' : ''));
                            }
                        }
                        
                        // 处理元素背景
                        if (el.style && el.style.backgroundImage && !shouldSkipElement(el)) {
                            if (processInlineBackground(el)) {
                                count++;
                            }
                        }
                        
                        // 如果是图片元素
                        if (el.tagName === 'IMG' && !shouldSkipElement(el)) {
                            if (processImageElement(el)) {
                                count++;
                            }
                        }
                        
                        // 处理子元素内的图片
                        const childImages = el.querySelectorAll('img');
                        childImages.forEach(img => {
                            try {
                                if (!shouldSkipElement(img) && processImageElement(img)) {
                                    count++;
                                }
                            } catch (e) {
                                debugLog('处理视频网站内图片时出错:', e);
                            }
                        });
                    } catch (e) {
                        debugLog('处理视频网站元素时出错:', e);
                    }
                });
                
                if (count > 0) {
                    debugLog(`处理了${count}个视频网站元素`);
                }
            } catch (error) {
                debugLog('处理视频网站元素时出错:', error);
            }
        }, checkInterval);
        
        // 存储定时器，便于清理
        window._imageProxyHandler.timers = window._imageProxyHandler.timers || [];
        window._imageProxyHandler.timers.push(videoObserver);
    }
    
    // 设置MutationObserver监听DOM变化
    function setupImageObserver() {
        if (!isDocumentReady()) {
            debugLog('文档尚未准备好，跳过设置DOM变化观察器');
            
            // 设置一个延迟调用，当文档准备好时再次尝试
            document.addEventListener('DOMContentLoaded', () => {
                if (!window._imageProxyHandler.observerInitialized) {
                    setupImageObserver();
                }
            });
            return;
        }
        
        debugLog('设置DOM变化观察器');
        
        try {
            // 标记观察器已初始化
            window._imageProxyHandler.observerInitialized = true;
            
            // 创建一个观察器实例
            const observer = new MutationObserver(mutations => {
                let newImages = [];
                let newBgElements = [];
                let newMediaElements = [];
                
                mutations.forEach(mutation => {
                    // 处理新增的节点
                    if (mutation.addedNodes.length) {
                        mutation.addedNodes.forEach(node => {
                            try {
                                // 如果是图片元素
                                if (node.nodeName === 'IMG' && !shouldSkipElement(node)) {
                                    newImages.push(node);
                                }
                                
                                // 如果是音频/视频元素
                                if ((node.nodeName === 'AUDIO' || node.nodeName === 'VIDEO') && 
                                    node.hasAttribute('poster') && 
                                    !node.hasAttribute('data-original-poster') && 
                                    !shouldSkipElement(node)) {
                                    newMediaElements.push(node);
                                }
                                
                                // 处理子元素中的图片和背景
                                if (node.querySelectorAll) {
                                    try {
                                        // 收集需要处理的元素
                                        const images = Array.from(node.querySelectorAll('img'))
                                            .filter(img => !shouldSkipElement(img));
                                        newImages.push(...images);
                                        
                                        const mediaElements = Array.from(node.querySelectorAll('audio[poster], video[poster]'))
                                            .filter(media => !media.hasAttribute('data-original-poster') && !shouldSkipElement(media));
                                        newMediaElements.push(...mediaElements);
                                        
                                        if (config.processCssBackgrounds) {
                                            const elementsWithBg = Array.from(node.querySelectorAll('[style*="background-image"]'))
                                                .filter(el => !shouldSkipElement(el));
                                            newBgElements.push(...elementsWithBg);
                                        }
                                    } catch (e) {
                                        debugLog('处理子元素时出错:', e);
                                    }
                                }
                                
                                // 处理新添加元素的内联背景
                                if (config.processCssBackgrounds && 
                                    node.style && 
                                    node.style.backgroundImage && 
                                    !shouldSkipElement(node)) {
                                    newBgElements.push(node);
                                }
                            } catch (e) {
                                debugLog('处理新增节点时出错:', e);
                            }
                        });
                    }
                    
                    // 处理修改的属性
                    if (mutation.type === 'attributes') {
                        const target = mutation.target;
                        
                        try {
                            // 如果修改的是相关属性且目标是img元素
                            if ((mutation.attributeName === 'src' || 
                                 mutation.attributeName === 'data-src' || 
                                 mutation.attributeName === 'data-lazy-src' ||
                                 mutation.attributeName === 'data-cover' ||
                                 mutation.attributeName === 'srcset') && 
                                target.nodeName === 'IMG' && 
                                !shouldSkipElement(target)) {
                                
                                const attrValue = target.getAttribute(mutation.attributeName);
                                if (attrValue && !attrValue.includes('images.weserv.nl') && !attrValue.startsWith('data:') && !attrValue.startsWith('blob:')) {
                                    newImages.push(target);
                                }
                            }
                            
                            // 如果修改的是poster属性且目标是audio/video元素
                            if (mutation.attributeName === 'poster' && 
                                (target.nodeName === 'AUDIO' || target.nodeName === 'VIDEO') && 
                                !target.hasAttribute('data-original-poster') && 
                                !shouldSkipElement(target)) {
                                
                                const posterValue = target.getAttribute('poster');
                                if (posterValue && !posterValue.includes('images.weserv.nl') && !posterValue.startsWith('data:') && !posterValue.startsWith('blob:')) {
                                    newMediaElements.push(target);
                                }
                            }
                            
                            // 如果修改的是style属性且背景图发生变化
                            if (config.processCssBackgrounds && 
                                mutation.attributeName === 'style' && 
                                target.style && 
                                target.style.backgroundImage && 
                                !shouldSkipElement(target)) {
                                
                                const bgImage = target.style.backgroundImage;
                                if (bgImage && !bgImage.includes('images.weserv.nl') && !bgImage.startsWith('data:') && !bgImage.startsWith('blob:')) {
                                    newBgElements.push(target);
                                }
                            }
                            
                            // 处理class变化，特别是active/playing类（可能表示音乐播放器中的当前项）
                            if (mutation.attributeName === 'class' && (target.classList.contains('active') || target.classList.contains('playing'))) {
                                // 处理内部图片
                                const activeImages = target.querySelectorAll('img');
                                if (activeImages.length > 0) {
                                    activeImages.forEach(img => {
                                        if (!shouldSkipElement(img)) {
                                            newImages.push(img);
                                        }
                                    });
                                }
                                
                                // 处理背景图
                                if (target.style && target.style.backgroundImage && !shouldSkipElement(target)) {
                                    newBgElements.push(target);
                                }
                            }
                        } catch (e) {
                            debugLog('处理属性变更时出错:', e);
                        }
                    }
                });
                
                // 批量处理收集到的元素，减少页面重绘
                let count = 0;
                
                // 处理图片元素
                if (newImages.length > 0) {
                    newImages.forEach(img => {
                        try {
                            if (processImageElement(img)) {
                                count++;
                            }
                        } catch (e) {
                            debugLog('处理新图片元素时出错:', e);
                        }
                    });
                }
                
                // 处理背景图片元素
                if (newBgElements.length > 0) {
                    newBgElements.forEach(el => {
                        try {
                            if (processInlineBackground(el)) {
                                count++;
                            }
                        } catch (e) {
                            debugLog('处理新背景元素时出错:', e);
                        }
                    });
                }
                
                // 处理媒体元素的海报
                if (newMediaElements.length > 0) {
                    newMediaElements.forEach(media => {
                        try {
                            const posterUrl = media.getAttribute('poster');
                            if (posterUrl && !posterUrl.includes('images.weserv.nl') && !posterUrl.startsWith('data:') && !posterUrl.startsWith('blob:')) {
                                // 避免重复处理
                                if (config.preventDuplicateProcessing && processedUrls.has('poster:' + posterUrl)) {
                                    return;
                                }
                                
                                media.setAttribute('data-original-poster', posterUrl);
                                media.setAttribute('poster', getProxyUrl(posterUrl));
                                processedUrls.add('poster:' + posterUrl);
                                count++;
                            }
                        } catch (e) {
                            debugLog('处理媒体元素海报时出错:', e);
                        }
                    });
                }
                
                if (count > 0) {
                    debugLog(`通过DOM观察器处理了${count}个元素`);
                }
            });
            
            // 配置观察选项
            const observerConfig = {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: [
                    'src', 'srcset', 'poster', 'class',
                    'data-src', 'data-lazy-src', 'data-original', 'lazy-src', 
                    'data-cover', 'data-thumbnail', 'data-image', 'style'
                ]
            };
            
            // 开始观察整个文档
            observer.observe(document, observerConfig);
            
            // 存储观察器，便于清理
            window._imageProxyHandler.observers = window._imageProxyHandler.observers || [];
            window._imageProxyHandler.observers.push(observer);
        } catch (error) {
            debugLog('设置DOM观察器时出错:', error);
        }
    }
    
    // 获取代理URL
    function getProxyUrl(originalUrl) {
        try {
            // 如果URL为空，直接返回
            if (!originalUrl || typeof originalUrl !== 'string') {
                return originalUrl;
            }
            
            // 如果已经是代理URL或者是特殊URL，直接返回
            if (originalUrl.includes('images.weserv.nl') || 
                originalUrl.startsWith('data:') || 
                originalUrl.startsWith('blob:') ||
                originalUrl.startsWith('javascript:')) {
                return originalUrl;
            }
            
            // 判断是否为完整URL（以http://或https://开头）
            if (originalUrl.match(/^https?:\/\//i)) {
                // 直接添加代理前缀
                return config.proxyPrefix + encodeURIComponent(originalUrl);
            } 
            // 判断是否为://开头的协议相对URL
            else if (originalUrl.startsWith('//')) {
                // 添加https:并加上代理前缀
                return config.proxyPrefix + encodeURIComponent('https:' + originalUrl);
            }
            // 判断是否为根路径（以/开头）
            else if (originalUrl.startsWith('/')) {
                // 组合完整URL并添加代理前缀
                return config.proxyPrefix + encodeURIComponent(baseUrl + originalUrl);
            }
            // 相对路径
            else {
                // 获取当前路径
                const currentPath = window.location.pathname || '/';
                // 获取当前路径的目录部分
                const directory = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
                // 组合完整URL并添加代理前缀
                return config.proxyPrefix + encodeURIComponent(baseUrl + directory + originalUrl);
            }
        } catch (error) {
            debugLog('获取代理URL时出错:', error, originalUrl);
            return originalUrl; // 出错时返回原始URL
        }
    }
    
    // 清理函数
    function cleanup() {
        try {
            // 清除定时器
            if (window._imageProxyHandler.timers) {
                window._imageProxyHandler.timers.forEach(timer => {
                    try {
                        clearInterval(timer);
                    } catch (e) {
                        // 忽略清除错误
                    }
                });
                window._imageProxyHandler.timers = [];
            }
            
            // 断开观察器
            if (window._imageProxyHandler.observers) {
                window._imageProxyHandler.observers.forEach(observer => {
                    try {
                        observer.disconnect();
                    } catch (e) {
                        // 忽略断开错误
                    }
                });
                window._imageProxyHandler.observers = [];
            }
            
            console.log('✅ 图片代理转换已清理');
        } catch (e) {
            console.error('❌ 清理图片代理时出错:', e);
        }
    }
    
    // 提供停止方法
    window._imageProxyHandler.stop = cleanup;
    
    // 启动代理系统
    initialize();
    
    // 确保在页面卸载时清理资源
    try {
        window.addEventListener('beforeunload', cleanup);
    } catch (e) {
        // 忽略事件监听器添加错误
    }
})();
