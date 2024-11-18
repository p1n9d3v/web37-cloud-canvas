import Graph from '@components/Graph';
import GridBackground from '@components/GridBackground';
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import Box from '@mui/material/Box';
// import { CloudGraph } from '@cloud-graph/index';

function App() {
    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                <Header />
                <Graph>
                    <GridBackground dimension="2d" />
                    {/* <rect */}
                    {/*     x="0" */}
                    {/*     y="0" */}
                    {/*     width="100%" */}
                    {/*     height="100%" */}
                    {/*     fill="#f0f0f0" */}
                    {/* /> */}
                </Graph>
            </Box>
        </Box>
    );
}

export default App;
