import {
  useSelect,
  useDispatch,
} from '@wordpress/data';


function usePreviewDevice() {
  const previewDevice = useSelect(select => select('core/editor').getDeviceType(), []);
  const {
    setDeviceType: setPreviewDevice,
  } = useDispatch('core/editor');

  return [previewDevice, setPreviewDevice];
}

export default usePreviewDevice;
