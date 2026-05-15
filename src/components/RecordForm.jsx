import { useState } from 'react'
import { EMOTION_OPTIONS, parseTagsInput } from '../utils/records.js'

function RecordForm({ tags, onAddRecord }) {
  const [emotion, setEmotion] = useState('calm')
  const [note, setNote] = useState('')
  const [intensity, setIntensity] = useState(3)
  const [selectedTags, setSelectedTags] = useState([])
  const [customTags, setCustomTags] = useState('')
  const [formMessage, setFormMessage] = useState('')

  function toggleTag(tagLabel) {
    setSelectedTags((currentTags) =>
      currentTags.includes(tagLabel)
        ? currentTags.filter((tag) => tag !== tagLabel)
        : [...currentTags, tagLabel],
    )
  }

  function resetForm() {
    setEmotion('calm')
    setNote('')
    setIntensity(3)
    setSelectedTags([])
    setCustomTags('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    const safeNote = note.trim()

    if (!safeNote) {
      setFormMessage('先给今天留下一句小小的心情，再把花种下吧。')
      return
    }

    onAddRecord({
      emotion,
      note: safeNote,
      intensity,
      tags: [...selectedTags, ...parseTagsInput(customTags)],
    })

    setFormMessage('已经种下了。')
    resetForm()
  }

  return (
    <form className="surface-panel record-form" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <p className="eyebrow">Record</p>
        <h2>写一朵今天的花</h2>
      </div>

      <fieldset>
        <legend>选择心情</legend>
        <div className="chip-row">
          {EMOTION_OPTIONS.map((option) => (
            <button
              className={emotion === option.key ? 'choice-chip is-selected' : 'choice-chip'}
              key={option.key}
              onClick={() => setEmotion(option.key)}
              type="button"
            >
              <span aria-hidden="true">{option.moodIcon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="form-field">
        情绪强度：{intensity} / 5
        <input
          max="5"
          min="1"
          onChange={(event) => setIntensity(Number(event.target.value))}
          type="range"
          value={intensity}
        />
      </label>

      <fieldset>
        <legend>标签</legend>
        <div className="chip-row">
          {tags.map((tag) => (
            <button
              className={
                selectedTags.includes(tag.label) ? 'tag-chip is-selected' : 'tag-chip'
              }
              key={tag.id}
              onClick={() => toggleTag(tag.label)}
              type="button"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="form-field">
        自定义标签
        <input
          onChange={(event) => setCustomTags(event.target.value)}
          placeholder="用空格或逗号分隔"
          type="text"
          value={customTags}
        />
      </label>

      <label className="form-field">
        记录片段
        <textarea
          onChange={(event) => setNote(event.target.value)}
          placeholder="今天发生了什么？哪怕只是一句话也很好。"
          value={note}
        />
      </label>

      {formMessage ? (
        <p className="form-message" role="status">
          {formMessage}
        </p>
      ) : null}

      <button className="primary-action" type="submit">
        种下这朵花
      </button>
    </form>
  )
}

export default RecordForm
