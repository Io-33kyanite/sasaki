export interface MediaItem {
  type: 'image' | 'youtube'
  src: string // 画像ファイル名（拡張子含む）またはYouTube動画ID
  alt?: string // 画像の場合の代替テキスト
  caption?: string // キャプション（オプション）
}

export interface Reference {
  title: string
  doi: string
}

export interface ProjectMeta {
  title: string
  description: string // Markdown形式で記述可能
  path?: string
  // 言語ごとのファイルにメディア配列を直接記述
  media: MediaItem[]
  refs: Reference[]
}
