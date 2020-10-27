import { getClassName, mergeClassNames } from './utils'

const css = {
    actions: getClassName(),
    cancelButton: getClassName(),
    container: getClassName(),
    dotBL: getClassName(),
    dotBR: getClassName(),
    dotTL: getClassName(),
    dotTR: getClassName(),
    fakeSourceImage: getClassName(),
    fakeViewContent: getClassName(),
    frame: getClassName(),
    handler: getClassName(),
    portal: getClassName(),
    preview: getClassName(),
    resultImage: getClassName(),
    shadow: getClassName(),
    sourceImage: getClassName(),
    submitButton: getClassName(),
    viewContent: getClassName(),
}

export default function getCssClassNames(propsCss) {
    const styleSource = `
        .${css.container} {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: absolute;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, .75)
        }

        .${css.portal} {
            display: flex;
            background-color: #FFF;
            border-radius: 8px;
            user-select: none;
        }

        .${css.preview} {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 200px;
            min-height: 100px;
            border-left: 1px solid #EEE;
            padding: 20px
        }

        .${css.frame} {
            display: flex;
            position: relative;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            backfround-color: #84848b;
        }

        .${css.sourceImage} {
            display: block;
            filter: blur(2px);
            transform: translateZ(0);
            width: auto;
            backface-visibility: hidden;
            user-select: none;
            perspective: 1000px;
            overflow: hidden;
        }

        .${css.resultImage} {
            display: block;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 1px solid #EEE;
            margin-bottom: 20px;
        }

        .${css.actions} {
            display: flex;
            height: 60px;
            flex: 0 0 auto;
            width: 100%;
            justify-content: space-between;
            align-items: center;
        }

        .${css.cancelButton} {
            display: block;
            cursor: pointer;
        }

        .${css.submitButton} {
            display: block;
            cursor: pointer;
        }

        .${css.shadow} {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, .4);
        }

        .${css.viewContent} {
            display: block;
            position: absolute;
        }

        .${css.fakeViewContent} {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 100;
            overflow: hidden;
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }

        .${css.fakeSourceImage} {
            backface-visibility: hidden;
            transform: translateZ(0);
            user-select: none;
            perspective: 1000px;
        }

        .${css.handler} {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 101;
            outline: 1px dashed #aaa;
            background-color: transparent;
            cursor: move;
            user-select: none;
        }

        .${css.dotTL} {
            cursor: nw-resize;
            top: -3px;
            left: -3px;
            position: absolute;
            margin: 0;
            padding: 0;
            width: 5px;
            height: 5px;
            background-color: #fff;
        }

        .${css.dotTR} {
            cursor: ne-resize;
            top: -3px;
            right: -3px;
            position: absolute;
            margin: 0;
            padding: 0;
            width: 5px;
            height: 5px;
            background-color: #fff;
        }

        .${css.dotBR} {
            cursor: se-resize;
            bottom: -3px;
            right: -3px;
            position: absolute;
            margin: 0;
            padding: 0;
            width: 5px;
            height: 5px;
            background-color: #fff;
        }

        .${css.dotBL} {
            cursor: sw-resize;
            bottom: -3px;
            left: -3px;
            position: absolute;
            margin: 0;
            padding: 0;
            width: 5px;
            height: 5px;
            background-color: #fff;
        }
    `

    const style = document.createElement('style')

    style.type = 'text/css'
    style.innerHTML = styleSource

    const head = document.getElementsByTagName('head')[0]
    const headStyle = document.getElementsByTagName('style')[0]
    head.insertBefore(style, headStyle)

    return {
        actions: mergeClassNames(css.actions, propsCss.actions),
        cancelButton: mergeClassNames(css.cancelButton, propsCss.cancelButton),
        container: mergeClassNames(css.container, propsCss.container),
        dotBL: mergeClassNames(css.dotBL, propsCss.dotBL),
        dotBR: mergeClassNames(css.dotBR, propsCss.dotBR),
        dotTL: mergeClassNames(css.dotTL, propsCss.dotTL),
        dotTR: mergeClassNames(css.dotTR, propsCss.dotTR),
        fakeSourceImage: mergeClassNames(css.fakeSourceImage, propsCss.fakeSourceImage),
        fakeViewContent: mergeClassNames(css.fakeViewContent, propsCss.fakeViewContent),
        frame: mergeClassNames(css.frame, propsCss.frame),
        handler: mergeClassNames(css.handler, propsCss.handler),
        portal: mergeClassNames(css.portal, propsCss.portal),
        preview: mergeClassNames(css.preview, propsCss.preview),
        resultImage: mergeClassNames(css.resultImage, propsCss.resultImage),
        shadow: mergeClassNames(css.shadow, propsCss.shadow),
        sourceImage: mergeClassNames(css.sourceImage, propsCss.sourceImage),
        submitButton: mergeClassNames(css.submitButton, propsCss.submitButton),
        viewContent: mergeClassNames(css.viewContent, propsCss.viewContent),
    }
}
