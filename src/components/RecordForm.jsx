function RecordForm() {
  return (
    <form className="placeholder-card record-form" aria-label="情绪记录表单占位">
      <p className="eyebrow">Record</p>
      <h2>记录表单</h2>
      <label>
        心情占位
        <input type="text" placeholder="后续接入心情选择" disabled />
      </label>
      <label>
        备注占位
        <textarea placeholder="后续接入文本记录" disabled />
      </label>
      <button type="button" disabled>
        保存占位
      </button>
    </form>
  )
}

export default RecordForm
