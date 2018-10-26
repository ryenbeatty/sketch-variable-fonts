import { connect } from 'react-redux';
import { STORE_KEY } from '~/store/Provider';

function connectExtended(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
  options.storeKey = STORE_KEY;
  return connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options
  );
}

export { connectExtended as connect };
