/**
 * Style
 */
import "./youtube-video.scss";

/**
 * Dipslay a video
 *
 * @param {String} name
 * @param {Object} videos
 * @returns JSXComponent
 */
export const YouTubeVideo = ({ id, title }) => {
  return (
    <div className="video-tutorials__item">
      <div className="video-tutorials__item__video youtube-video">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img{position:absolute;width:100%;top:0;bottom:0;margin:auto}.btn-play{position: absolute;top: 50%;left: 50%;z-index: 1;display: block;width: 68px;height: 48px;margin:0;cursor: pointer;transform: translate3d(-50%, -50%, 0);background-color: transparent;background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/><path d="M45 24 27 14v20" fill="white"/></svg>');filter: grayscale(100%);transition: filter .1s cubic-bezier(0, 0, 0.2, 1);border: none;}body:hover .btn-play,.btn-play:focus{filter:none}.visually-hidden{clip: rect(0 0 0 0);clip-path: inset(50%);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;}</style><a href="https://www.youtube.com/embed/${id}?autoplay=1&enablejsapi=1&playsinline=1"><img src="https://img.youtube.com/vi/${id}/maxresdefault.jpg" alt="${title}"><button type="button" class="btn-play"><span class="visually-hidden">Play</span></button></a>`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "100%" }}
        ></iframe>
      </div>
      <div className="video-tutorials__item__desc video-caption">{title}</div>
    </div>
  );
};
