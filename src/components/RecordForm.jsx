const moodOptions = ['平静', '期待', '专注', '疲惫']

function RecordForm({ tags, onPreviewSave }) {
  return (
    <form className="surface-panel record-form" aria-label="静态情绪记录表单">
      <div className="panel-heading">
        <p className="eyebrow">Record</p>
        <h2>写一朵今天的花</h2>
      </div>

      <fieldset>
        <legend>选择心情</legend>
        <div className="chip-row">
          {moodOptions.map((mood) => (
            <button
              className={mood === '平静' ? 'choice-chip is-selected' : 'choice-chip'}
              key={mood}
              type="button"
            >
              {mood}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="form-field">
        情绪强度
        <div className="static-slider" aria-label="静态强度 72%">
          <span style={{ width: '72%' }}></span>
        </div>
      </label>

      <fieldset>
        <legend>标签</legend>
        <div className="chip-row">
          {tags.map((tag) => (
            <button className="tag-chip" key={tag.id} type="button">
              {tag.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="form-field">
        记录片段
        <textarea
          readOnly
          value="今天完成了重要的小事，晚上散步时感觉呼吸慢了下来。"
        />
      </label>

      <button className="primary-action" type="button" onClick={onPreviewSave}>
        保存静态预览
      </button>
    </form>
  )
}

export default RecordForm
