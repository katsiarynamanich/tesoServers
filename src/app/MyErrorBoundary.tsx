/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';

export default class MyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error): any {
    return { hasError: true };
  }

  render() {
    const { children }: any = this.props;
    const { hasError }: any = this.state;
    if (hasError) {
      return <h1>Something is wrong...</h1>;
    }

    return children;
  }
}
