import { actionIcons, emptyStateImages } from '../assets/uiAssets.js'

function TagCloud({ tags = [], selectedTag = '', onSelectTag = () => {} }) {
  return (
    <section className="surface-panel tag-cloud">
      <div className="panel-heading">
        <h2>标签云</h2>
      </div>

      {tags.length === 0 ? (
        <div className="empty-state compact-empty">
          <img
            alt=""
            aria-hidden="true"
            className="ui-illustration ui-illustration--sm empty-state-asset"
            src={emptyStateImages.noTags}
          />
          <strong>还没有标签</strong>
          <p>记录时加上标签，以后就能按它们找回相似的心情花。</p>
        </div>
      ) : (
        <div className="tag-cloud-list">
          {tags.map((tag) => (
            <button
              aria-pressed={selectedTag === tag.label}
              className={
                selectedTag === tag.label ? 'tag-cloud-item is-active' : 'tag-cloud-item'
              }
              key={tag.id}
              onClick={() => onSelectTag(tag.label)}
              type="button"
            >
              <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={actionIcons.tag} />
              {tag.label}
              <span>{tag.count}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

export default TagCloud
