import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Color from "../components/color";

const Project = () => {
  const [data, setData] = useState();
  const { projectId } = useParams();

  useEffect(() => {
    fetch(`/src/data.json`)
      .then((res) => res.json())
      .then((res) =>
        setData(res.filter((_data) => _data.id === Number(projectId))[0])
      );
    fetch(`/src/${projectId}/colors.json`).then((res) =>
      res.json().then((colors) => setData((prev) => ({ ...prev, ...colors })))
    );
  }, [projectId]);
  const tap = () => window.open(`/src/${data.id}/index.html`, "_blank");
  const share = () => {
    navigator.clipboard
      .writeText(document.location.href + `project/${data.id}`)
      .then(() =>
        alert(
          `Copied ${
            document.location.href + `project/${data.id}`
          }\nclipboard\npaste for any input ctrl+v\nclose for press enter or space`,
          2555
        )
      )
      .catch((err) => alert(err));
  };
  return (
    <div className="project">
      <Helmet>
        <title>Project {`${data?.id}`}</title>
      </Helmet>
      <div className="content">
        <div className="img-wrapper">
          <img src={`/src/${projectId}/main.png`} alt="mainpng" />
          <button onClick={tap} className="demo">
            demo
          </button>
        </div>
        <div className="details">
          <button onClick={share}>
            <div className="share">
              <ShareIcon />
              <p>Share</p>
            </div>
          </button>
          <div className="body">
            <h1>{data?.title}</h1>
            <p>{data?.date}</p>
          </div>
          <div className="colors">
            <p className="colors-text">Colors</p>
            <div className="c-colors">
              {data?.colors?.map((color) => (
                <Color color={color} key={color} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ShareIcon() {
  return (
    <svg
      width="15px"
      height="14px"
      viewBox="0 0 15 14"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>share-icon</title>
      <desc>Created with Sketch.</desc>
      <g
        id="Main-Mockups"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="selected-design-copy-5"
          transform="translate(-1085.000000, -97.000000)"
          fill="#7D7A9E"
        >
          <g id="Group-8" transform="translate(1070.000000, 84.000000)">
            <g id="share-icon" transform="translate(15.000000, 13.000000)">
              <path
                d="M14.8302539,4.64665502 L10.5476074,0.178331878 C10.4416406,0.067768559 10.3162207,0.0124716157 10.1712305,0.0124716157 C10.0262402,0.0124716157 9.90073242,0.067768559 9.79485352,0.178331878 C9.68888672,0.288956332 9.63583008,0.419877729 9.63583008,0.571126638 L9.63583008,2.80528821 L7.76220703,2.80528821 C3.78615234,2.80528821 1.34666016,3.97768122 0.443173828,6.32240611 C0.147714844,7.10194323 0,8.07078603 0,9.22859825 C0,10.1943537 0.354111328,11.5063188 1.06227539,13.1645546 C1.07897461,13.2053624 1.1081543,13.2750262 1.15004883,13.3739127 C1.19191406,13.472738 1.22950195,13.5600087 1.26295898,13.6357249 C1.2965332,13.7112576 1.33280273,13.7752664 1.37179688,13.8275677 C1.43865234,13.9265153 1.51675781,13.9760961 1.60599609,13.9760961 C1.68963867,13.9760961 1.75517578,13.9470262 1.80260742,13.8888559 C1.84992187,13.8307162 1.87362305,13.7579039 1.87362305,13.6708472 C1.87362305,13.6183319 1.86665039,13.5413624 1.85267578,13.4394803 C1.83873047,13.3375983 1.83172852,13.2694017 1.83172852,13.2344323 C1.80380859,12.8389476 1.78986328,12.4808472 1.78986328,12.1610786 C1.78986328,11.573476 1.83873047,11.046917 1.93623047,10.5814934 C2.03387695,10.1159782 2.16908203,9.71315721 2.34199219,9.37275546 C2.51487305,9.03223144 2.73785156,8.73862882 3.01116211,8.49133624 C3.28435547,8.24404367 3.5784668,8.04193013 3.89352539,7.88481223 C4.20864258,7.72766376 4.57945312,7.60401747 5.00604492,7.51387336 C5.43260742,7.42369869 5.86195312,7.36112664 6.29416992,7.32618777 C6.72638672,7.29124891 7.21570312,7.27388646 7.76220703,7.27388646 L9.63583008,7.27388646 L9.63583008,9.50810917 C9.63583008,9.65935808 9.68876953,9.79031004 9.79464844,9.90081223 C9.90070312,10.0112533 10.026123,10.0666114 10.1710254,10.0666114 C10.3159863,10.0666114 10.4414941,10.0112533 10.5476074,9.90081223 L14.830166,5.43233624 C14.9361328,5.32177293 14.9890723,5.19091266 14.9890723,5.03963319 C14.989043,4.88838428 14.9361328,4.75743231 14.8302539,4.64665502 Z"
                id="Path"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Project;
