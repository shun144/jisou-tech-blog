"use client";
import { Component, ReactNode } from "react";
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class MyBlogsErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
        <span className="text-red-400">⚠</span>
        <p className="text-sm text-red-500">
          マイブログの読み込みに失敗しました
        </p>
      </div>
    );
  }
}
