import flowerAnxiousImage from '../assets/ui/flowers/flower-anxious.png'
import flowerCalmImage from '../assets/ui/flowers/flower-calm.png'
import flowerExcitedImage from '../assets/ui/flowers/flower-excited.png'
import flowerHappyImage from '../assets/ui/flowers/flower-happy.png'
import flowerTiredImage from '../assets/ui/flowers/flower-tired.png'
import moodAnxiousIcon from '../assets/ui/icons/mood-anxious.png'
import moodCalmIcon from '../assets/ui/icons/mood-calm.png'
import moodExcitedIcon from '../assets/ui/icons/mood-excited.png'
import moodHappyIcon from '../assets/ui/icons/mood-happy.png'
import moodTiredIcon from '../assets/ui/icons/mood-tired.png'
import { normalizeEmotion } from './records.js'

export const moodIconAssets = {
  happy: moodHappyIcon,
  calm: moodCalmIcon,
  anxious: moodAnxiousIcon,
  tired: moodTiredIcon,
  excited: moodExcitedIcon,
}

export const flowerAssets = {
  happy: flowerHappyImage,
  calm: flowerAnxiousImage,
  anxious: flowerCalmImage,
  tired: flowerTiredImage,
  excited: flowerExcitedImage,
}

const assetAliases = {
  happy: 'happy',
  开心: 'happy',
  快乐: 'happy',
  '🌼': 'happy',
  calm: 'calm',
  平静: 'calm',
  专注: 'calm',
  '🌿': 'calm',
  anxious: 'anxious',
  焦虑: 'anxious',
  紧张: 'anxious',
  '☁️': 'anxious',
  tired: 'tired',
  疲惫: 'tired',
  有点疲惫: 'tired',
  '🌙': 'tired',
  excited: 'excited',
  兴奋: 'excited',
  期待: 'excited',
  被支持: 'excited',
  '✨': 'excited',
}

function resolveAssetKey(value) {
  const rawValue = typeof value === 'string' ? value.trim() : ''

  if (!rawValue) {
    return ''
  }

  if (assetAliases[rawValue]) {
    return assetAliases[rawValue]
  }

  const normalized = normalizeEmotion(rawValue)
  return normalized !== 'calm' ? normalized : ''
}

export function getEmotionAssetKey(value) {
  const candidates =
    value && typeof value === 'object'
      ? [value.emotion, value.mood, value.emotionLabel, value.label, value.moodIcon]
      : [value]

  for (const candidate of candidates) {
    const key = resolveAssetKey(candidate)

    if (key) {
      return key
    }
  }

  return 'calm'
}

export function getMoodIconAsset(value) {
  return moodIconAssets[getEmotionAssetKey(value)] || moodIconAssets.calm
}

export function getFlowerAsset(value) {
  return flowerAssets[getEmotionAssetKey(value)] || flowerAssets.calm
}
