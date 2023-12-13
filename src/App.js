/* eslint-disable */
import './styles/common/reset.css'
import {Mobile, PC} from "./components/config/Responsive";


function App() {
  return (
      <div id='wrap'>
        <main>
          <PC>
            <div className="pcWrap">
              <p className="pcWrapInner">화면을 550px 이하로 줄여주세요.</p>
            </div>
          </PC>
          <Mobile>
            <p>TEST</p>
          </Mobile>
        </main>
      </div>
  );
}

export default App;
