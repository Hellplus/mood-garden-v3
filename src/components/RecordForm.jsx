import { useState } from 'react'
import { actionIcons, decorationImages, moodIcons, strengthIcons } from '../assets/uiAssets.js'
import { EMOTION_OPTIONS, parseTagsInput } from '../utils/records.js'

const NOTE_MAX_LENGTH = 200

function RecordForm({ tags, onAddRecord, formRef, noteInputRef }) {
  const [emotion, setEmotion] = useState('calm')
  const [note, setNote] = useState('')
  const [intensity, setIntensity] = useState(3)
  const [selectedTags, setSelectedTags] = useState([])
  const [customTags, setCustomTags] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [showMoreOptions, setShowMoreOptions] = useState(false)

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
    setShowMoreOptions(false)
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
    <form className="surface-panel record-form" ref={formRef} onSubmit={handleSubmit}>
      <img
        alt=""
        aria-hidden="true"
        className="record-form-decoration record-form-decoration--sprout"
        src={decorationImages.recordSprout}
      />
      <div className="panel-heading">
        <div className="card-title-group">
          <h2>写一朵今天的花</h2>
        </div>
        <img
          alt=""
          aria-hidden="true"
          className="record-heading-asset"
          src={decorationImages.recordPencilNote}
        />
      </div>

      <fieldset className="record-emotion-fieldset">
        <legend>选择心情</legend>
        <div className="chip-row">
          {EMOTION_OPTIONS.map((option) => (
            <button
              className={
                emotion === option.key
                  ? 'choice-chip emotion-choice-chip is-selected'
                  : 'choice-chip emotion-choice-chip'
              }
              key={option.key}
              onClick={() => setEmotion(option.key)}
              type="button"
            >
              <img
                alt=""
                aria-hidden="true"
                className="mood-icon mood-icon--picker"
                src={moodIcons[option.key]}
              />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <label className="form-field record-note-field">
        <span className="field-label-row">
          写一句心情
          <span
            className={note.length >= NOTE_MAX_LENGTH ? 'textarea-counter is-full' : 'textarea-counter'}
          >
            {note.length}/{NOTE_MAX_LENGTH}
          </span>
        </span>
        <textarea
          maxLength={NOTE_MAX_LENGTH}
          onChange={(event) => setNote(event.target.value)}
          placeholder="今天发生了什么？一句话也很好。"
          ref={noteInputRef}
          value={note}
        />
        {note.length >= NOTE_MAX_LENGTH ? (
          <small className="field-helper field-helper--warning">
            已经写满 200 字，可以先种下这一朵花。
          </small>
        ) : (
          <small className="field-helper">一句话就很好，不需要写得很完整。</small>
        )}
      </label>

      <div className="record-more">
        <button
          aria-controls="record-more-options"
          aria-expanded={showMoreOptions}
          className="record-more-toggle"
          onClick={() => setShowMoreOptions((isOpen) => !isOpen)}
          type="button"
        >
          <span className="record-more-toggle-title">
            <span>{showMoreOptions ? '收起更多细节' : '添加更多细节（可选）'}</span>
            <img
              alt=""
              aria-hidden="true"
              className="ui-icon ui-icon--sm"
              src={showMoreOptions ? actionIcons.chevronUp : actionIcons.chevronDown}
            />
          </span>
          <small>
            {showMoreOptions
              ? '强度和标签会随这条记录一起保存。'
              : '强度、标签和自定义标签都可以不填。'}
          </small>
        </button>

        {showMoreOptions ? (
          <div className="record-more-options" id="record-more-options">
            <label className="form-field">
              <span className="field-label-row">
                情绪强度：{intensity} / 5
                <span className="strength-preview" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <img
                      alt=""
                      className="ui-icon ui-icon--sm strength-flower-icon"
                      key={level}
                      src={level <= intensity ? strengthIcons.filled : strengthIcons.empty}
                    />
                  ))}
                </span>
              </span>
              <input
                max="5"
                min="1"
                onChange={(event) => setIntensity(Number(event.target.value))}
                type="range"
                value={intensity}
              />
            </label>

            <fieldset>
              <legend>标签（可选）</legend>
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
              自定义标签（可选）
              <input
                onChange={(event) => setCustomTags(event.target.value)}
                placeholder="用空格或逗号分隔"
                type="text"
                value={customTags}
              />
            </label>
          </div>
        ) : null}
      </div>

      {formMessage ? (
        <p className="form-message" role="status">
          {formMessage}
        </p>
      ) : null}

      <button className="primary-action" type="submit">
        <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={decorationImages.recordSprout} />
        种下这朵花
      </button>
    </form>
  )
}

export default RecordForm
