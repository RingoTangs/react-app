# Shared Assets

Shared assets are product-agnostic files that are imported by application code
and processed by Vite.

共享资产是产品无关、会被应用代码 import，并由 Vite 参与构建处理的文件。

## Put Here

- Shared images, illustrations, SVG files, videos, and static media used by
  multiple features.
- Assets that should receive Vite hashing, bundling, and cache handling.

- 多个 feature 会复用的图片、插图、SVG、视频和静态媒体。
- 需要经过 Vite hash、bundle 和缓存处理的资产。

## Avoid

- Feature-specific images or copy; put those in `src/features/<feature>/assets`.
- Files that need stable public URLs; put those in `public`.
- SVG React icon components; put those in `src/shared/ui/icons` when introduced.

- 不要放 feature 私有图片或文案；应放到 `src/features/<feature>/assets`。
- 不要放需要固定公开 URL 的文件；应放到 `public`。
- 不要放 SVG React 图标组件；未来引入时应放到 `src/shared/ui/icons`。
