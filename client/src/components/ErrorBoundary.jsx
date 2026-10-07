import { Component } from 'react';

/** Catches render / lazy-chunk failures so a single broken page never leaves a blank screen. Resets when `resetKey` changes. */
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('[ui]', error?.message); // details stay in the console, never on screen
  }

  componentDidUpdate(prevProps) {
    if (this.state.failed && prevProps.resetKey !== this.props.resetKey) this.setState({ failed: false });
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div role="alert" className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white font-poppins">
        <h1 className="text-[#2b3990] text-[32px] md:text-[44px] font-600">Something went wrong</h1>
        <p className="text-[#001017] text-[16px] md:text-[18px] max-w-[520px] my-4">
          This page could not be displayed. Please reload, or return to the home page.
        </p>
        <div className="flex gap-3">
          <button type="button" onClick={() => window.location.reload()} className="px-5 py-2 bg-[#2b3990] text-white rounded-md">
            Reload page
          </button>
          <a href="/" className="px-5 py-2 border border-[#2b3990] text-[#2b3990] rounded-md">
            Go to home page
          </a>
        </div>
      </div>
    );
  }
}
