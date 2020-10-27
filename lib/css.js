import { getClassName, mergeClassNames } from './utils'

const css = {
    container: getClassName(),
    portal: getClassName(),
    preview: getClassName(),
    frame: getClassName(),
    sourceImage: getClassName(),
    resultImage: getClassName(),
    actions: getClassName(),
    cancelButton: getClassName(),
    submitButton: getClassName(),
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
        }

        .${css.sourceImage} {
            display: block;
        }

        .${css.resultImage} {
            display: block;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 1px solid #EEE;
            flex: 1 0 auto;
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
    `

    const style = document.createElement('style')

    style.type = 'text/css'
    style.innerHTML = styleSource

    const head = document.getElementsByTagName('head')[0]
    const headStyle = document.getElementsByTagName('style')[0]
    head.insertBefore(style, headStyle)

    return {
        container: mergeClassNames(css.container, propsCss.container),
        portal: mergeClassNames(css.portal, propsCss.portal),
        preview: mergeClassNames(css.preview, propsCss.preview),
        frame: mergeClassNames(css.frame, propsCss.frame),
        sourceImage: mergeClassNames(css.sourceImage, propsCss.sourceImage),
        resultImage: mergeClassNames(css.resultImage, propsCss.resultImage),
        actions: mergeClassNames(css.actions, propsCss.actions),
        cancelButton: mergeClassNames(css.cancelButton, propsCss.cancelButton),
        submitButton: mergeClassNames(css.submitButton, propsCss.submitButton),
    }
}
