import React, { Component, createRef, RefObject } from 'react';

import './Player.scss';

enum Orientation {
  Portrait = 'portrait',
  Landscape = 'landscape'
}

enum FitMode {
  Contain = 'contain',
  Cover = 'cover'
}

class Player extends Component<any, any> {
  private videoElementRef: RefObject<HTMLVideoElement> = createRef<HTMLVideoElement>();
  private resizeObserver: ResizeObserver = new ResizeObserver(() => this.manageVideoOrientation());

  componentDidMount() {
    this.resizeObserver.observe(this.videoElement);
  }

  shouldComponentUpdate(nextProps: Readonly<any>): boolean {
    const { orientation, stream, delta } = this.props;
    return nextProps.delta !== delta || nextProps.orientation !== orientation || nextProps.stream !== stream;
  }

  componentDidUpdate() {
    this.manageVideoOrientation();
  }

  private get videoElement(): HTMLVideoElement {
    return this.videoElementRef.current as HTMLVideoElement;
  }

  private manageVideoOrientation() {
    if (!this.videoElement) return;

    const { stream, delta, informationHandle } = this.props;
    const videoElementOrientation: Orientation = this.getVideoElementOrientation();
    const videoStreamOrientation: Orientation = this.getStreamOrientation();
    const aspectRatioDelta = this.getAspectRationDelta();

    let fitMode: FitMode = FitMode.Contain;

    if (stream.type === 'screen') {
      fitMode = FitMode.Contain;
    } else if (videoElementOrientation === videoStreamOrientation) {
      fitMode = FitMode.Cover;
    } else if (aspectRatioDelta <= delta) {
      fitMode = FitMode.Cover;
    }

    informationHandle({
      fitMode: fitMode,
      elementOrientation: videoElementOrientation,
      streamOrientation: videoStreamOrientation,
      aspectRatioDelta: aspectRatioDelta.toPrecision(3),
    });

    this.videoElement.style.objectFit = fitMode;
  }

  private getVideoElementOrientation(): Orientation {
    return this.videoElement
      ? this.getOrientation(this.videoElement.offsetWidth, this.videoElement.offsetHeight)
      : Orientation.Landscape;
  }

  private getStreamOrientation(): Orientation {
    return this.getOrientation(this.posterWidth, this.posterHeight);
  }

  private getOrientation(width: number, height: number): Orientation {
    return width >= height
      ? Orientation.Landscape
      : Orientation.Portrait;
  }

  private getAspectRationDelta() {
    const elementAspectRatio: number = this.videoElement.offsetWidth / this.videoElement.offsetHeight;
    const streamAspectRation: number = this.posterWidth / this.posterHeight;
    const delta: number = Math.abs(elementAspectRatio - streamAspectRation);

    return delta;
  }

  private get posterWidth(): number {
    const { orientation, stream } = this.props;
    return orientation === Orientation.Landscape ? stream.width : stream.height;
  }

  private get posterHeight(): number {
    const { orientation, stream } = this.props;
    return orientation === Orientation.Landscape ? stream.height : stream.width;
  }

  render () {
    const posterUrl: string = `https://picsum.photos/id/1074/${this.posterWidth}/${this.posterHeight}`;

    return (
      <video
        className="player"
        ref={this.videoElementRef}
        poster={posterUrl}
      />
    );
  }
}

export default Player;
