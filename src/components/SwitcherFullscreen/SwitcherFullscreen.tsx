function toggleFullscreen() {
  const element: any = document;
  const ElementT: any = Element;
  if (
    !element.fullscreenElement &&
    !element.mozFullScreenElement &&
    !element.webkitFullscreenElement
  ) {
    // current working methods
    if (element.documentElement.requestFullscreen) {
      element.documentElement.requestFullscreen();
    } else if (element.documentElement.mozRequestFullScreen) {
      element.documentElement.mozRequestFullScreen();
    } else if (element.documentElement.webkitRequestFullscreen) {
      element.documentElement.webkitRequestFullscreen(
        ElementT.ALLOW_KEYBOARD_INPUT,
      );
    }
  } else {
    if (element.cancelFullScreen) {
      element.cancelFullScreen();
    } else if (element.mozCancelFullScreen) {
      element.mozCancelFullScreen();
    } else if (element.webkitCancelFullScreen) {
      element.webkitCancelFullScreen();
    }
  }
}

const SwitcherFullscreen = () => {
  return (
    <div className='dropdown d-none d-lg-inline-block ms-1'>
      <button
        type='button'
        onClick={() => {
          toggleFullscreen();
        }}
        className='btn header-item noti-icon '
        data-toggle='fullscreen'
      >
        <i className='bx bx-fullscreen' />
      </button>
    </div>
  );
};

export default SwitcherFullscreen;
