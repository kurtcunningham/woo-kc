/**
 * Dipslay a video
 *
 * @param {String} name
 * @param {Object} videos
 * @returns JSXComponent
 */
export const VideoGuide = ({ name, videos = {} }) => {
  const videoInfo = videos[name] ?? null;

  return videoInfo ? (
    <>
      {videoInfo.title && <h4>{videoInfo.title}</h4>}
      <video width="1024" controls="controls">
        <source src={videoInfo.url} type="video/mp4" />
      </video>
      {videoInfo.caption && (
        <p className="video-caption">{videoInfo.caption}</p>
      )}
    </>
  ) : null;
};
