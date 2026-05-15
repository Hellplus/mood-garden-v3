function TagCloud({ tags }) {
  return (
    <section className="surface-panel tag-cloud">
      <div className="panel-heading">
        <p className="eyebrow">Tags</p>
        <h2>常用标签</h2>
      </div>

      <div className="tag-cloud-list">
        {tags.map((tag) => (
          <button className="tag-cloud-item" key={tag.id} type="button">
            {tag.label}
            <span>{tag.count}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default TagCloud
