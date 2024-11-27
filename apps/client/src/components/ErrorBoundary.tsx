import { Alert, Snackbar } from '@mui/material';
import React, { ReactNode, ErrorInfo } from 'react';

type ErrorBoundaryProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
    errorMessage: string;
    open: boolean;
};

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, errorMessage: '', open: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, errorMessage: error.message, open: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Errors', error, errorInfo);
    }

    handleClose = () => {
        this.setState({ open: false, hasError: false, errorMessage: '' });
    };

    render(): ReactNode {
        return (
            <>
                {this.props.children}
                {this.state.hasError && (
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={this.state.open}
                        autoHideDuration={5000}
                        onClose={this.handleClose}
                    >
                        <Alert severity="error">
                            {this.state.errorMessage}
                        </Alert>
                    </Snackbar>
                )}
            </>
        );
    }
}

export default ErrorBoundary;
