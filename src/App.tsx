import React, { Component } from 'react';

import './App.scss';
import Player from './components/Player/Player';

class App extends Component<any, any> {
  readonly dimensionsList: any = {
    'vga': {
      width: 640,
      height: 480,
    },
    'wga': {
      width: 800,
      height: 480,
    },
    'hd': {
      width: 1280,
      height: 720,
    },
    'wxga': {
      width: 1280,
      height: 800,
    },
    'fhd': {
      width: 1920,
      height: 1080,
    },
  };

  constructor(props: any) {
    super(props);

    this.state = {
      orientation: 'portrait',
      dimensions: 'vga',
      delta: 0.6,
      information: {},
    }
  }

  private formChangeHandle (field: string, value: any) {
    this.setState({
      ...this.state,
      [field]: value,
    });
  }

  private get stream(): any {
    return this.dimensionsList[this.state.dimensions];
  }

  private informationHandle(information: any): void {
    this.setState({
      information: information,
    });
  }

  render () {
    const { information, orientation, dimensions, delta } = this.state;

    return (
      <div className="app">
        <main className="app__main">
          <Player
            poster={null}
            stream={this.stream}
            orientation={orientation}
            delta={delta}
            informationHandle={(data: any) => this.informationHandle(data)}
          />
        </main>
        <aside className="app__aside">
          <form name="settings">
            <fieldset>
              <legend>Video orientation</legend>
              <label>
                <input
                  type="radio"
                  name="orientation"
                  value="portrait"
                  defaultChecked={orientation === 'portrait'}
                  onChange={() => this.formChangeHandle('orientation', 'portrait')}
                />
                <span>Portrait</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="orientation"
                  value="landscape"
                  defaultChecked={orientation === 'landscape'}
                  onChange={() => this.formChangeHandle('orientation', 'landscape')}
                />
                <span>Landscape</span>
              </label>
            </fieldset>

            <fieldset>
              <legend>Webcam Dimensions</legend>
              <label>
                <input
                  type="radio"
                  name="dimensions"
                  value="vga"
                  defaultChecked={dimensions === 'vga'}
                  onChange={() => this.formChangeHandle('dimensions', 'vga')}
                />
                <span>640&times;480</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="dimensions"
                  value="wga"
                  defaultChecked={dimensions === 'wga'}
                  onChange={() => this.formChangeHandle('dimensions', 'wga')}
                />
                <span>800&times;480</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="dimensions"
                  value="hd"
                  defaultChecked={dimensions === 'hd'}
                  onChange={() => this.formChangeHandle('dimensions', 'hd')}
                />
                <span>1280&times;720</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="dimensions"
                  value="wxga"
                  defaultChecked={dimensions === 'wxga'}
                  onChange={() => this.formChangeHandle('dimensions', 'wxga')}
                />
                <span>1280&times;800</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="dimensions"
                  value="fhd"
                  defaultChecked={dimensions === 'fhd'}
                  onChange={() => this.formChangeHandle('dimensions', 'fhd')}
                />
                <span>1920&times;1080</span>
              </label>
            </fieldset>

            <fieldset>
              <legend>Delta</legend>
              <label>
                <input
                  name="delta"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  defaultValue={delta}
                  onChange={(event: any) => this.formChangeHandle('delta', event.target.valueAsNumber)}
                />
              </label>
            </fieldset>
          </form>

          <fieldset>
            <legend>Information</legend>
            <ul>
              <li>
                Video orientation: <strong>{information.streamOrientation}</strong>
              </li>
              <li>
                Element orientation: <strong>{information.elementOrientation}</strong>
              </li>
              <li>
                Aspect ratio delta: <strong>{information.aspectRatioDelta}</strong>
              </li>
              <li>
                Selected delta: <strong>{delta}</strong>
              </li>
              <li>
                Selected fit mode: <strong>{information.fitMode}</strong>
              </li>
            </ul>
          </fieldset>

          <fieldset>
            <legend>Note</legend>
            <p>
              If the video element and the stream have <strong>different orientations</strong>, the allowable delta between the aspect ratio
              of the video element and the stream is taken into account.
            </p>
            <p>
              This allows us to ignore small differences in aspect ratio.
            </p>
            <p>
              The larger the allowed delta, the later it will switch to "contain" mode.
            </p>
            <p>
              Set delta to zero to switch modes immediately.
            </p>
          </fieldset>
        </aside>
      </div>
    );
  }
}

export default App;
