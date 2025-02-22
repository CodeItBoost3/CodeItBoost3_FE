import { Component } from "react";
import NotFound from "@/pages/NotFound"; 

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleGoHome = () => {
    this.setState({ hasError: false }); 
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return <NotFound />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
