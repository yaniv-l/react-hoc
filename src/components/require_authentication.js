import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class Authentication extends Component {
    // Placing a contextTypes property on the Authentication class  itself
    // (i.e static) of the router object from the context
    static contextTypes = {
      router: React.PropTypes.object
    }

    // componentWillMount is being called just before the component is about to
    // be redndered
    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    // componentWillUpdate will be called whenver the component has already been
    // redndered and currently being watched, in which case the
    // componentWillMount has already been executed, and thus
    // componentWillUpdate will be called whenever the component is about to be
    // update in which we can revalidate the
    componentWillUpdate(nextProps) {
      // nextProps is the updated state under which the componente has been
      // updtaed and represents the related props that are going to be updated
      // but are yet update - i.e a king of beforePropsCommit - thus, if we'll
      // check this.props.authenticated now it will still be in its current
      // (soon to be previous) value - uncomment the below console.log to see
      console.log('Current authenticated: ', this.props.authenticated,
        ' Next: ', nextProps.authenticated);  // For debug
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      //console.log(this.context);
      return <ComposedComponent {... this.props} />;
      }
    }

  function mapStateToProps(state) {
    return { authenticated: state.authenticated };
  }
  return connect(mapStateToProps)(Authentication);
}
