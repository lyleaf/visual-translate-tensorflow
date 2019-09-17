const googleKey = 'oTDdHsO-80anAp7HDCeAGSvXWN_ZLeR7BySazIA'
  .split('')
  .reverse()
  .join('')

export const apiUrls = {
  cloudVision:
    'https://vision.googleapis.com/v1/images:annotate?key=' + googleKey,
  translate: 'https://www.googleapis.com/language/translate/v2?key=' + googleKey
}

const queryLangs = window.location.search.slice(1)

export const langList = queryLangs
  ? queryLangs.split(',')
  : [
      'french'
    ]
