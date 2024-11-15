import * as d3 from 'd3';
import cloud from 'd3-cloud';
import {useEffect} from 'react';

import {iconSiren} from '../../assets/images';

import styles from '../../styles/components/main/TardyList.module.css';

export default function TardyList({data}) {
  const temp_data = [
    '박효신',
    '장원영',
    '차은우',
    '테스트',
    '고구마',
    '옥수수',
  ];

  const width = 400;
  const height = 300;

  // 단어 개수에 따른 기본 폰트 크기 계산
  const fontSize = wordCount => {
    if (wordCount == 1) return 100;
    if (wordCount <= 2) return 60;
    if (wordCount <= 4) return 50;
    if (wordCount <= 6) return 40;
    if (wordCount <= 8) return 30;
    if (wordCount <= 10) return 25;
    return 20;
  };

  useEffect(() => {
    const layout = cloud()
      .size([width, height])
      .words(
        temp_data.map(function (d) {
          return {text: d, size: 1};
        }),
      )
      .font('Impact')
      .fontSize(function (d) {
        return fontSize(temp_data.length);
      })
      .rotate(0)
      .on('end', end);

    layout.start();

    function end(words) {
      d3.select('#word-cloud')
        .append('svg')
        .attr('width', layout.size()[0])
        .attr('height', layout.size()[1])
        .append('g')
        .attr(
          'transform',
          'translate(' +
            layout.size()[0] / 2 +
            ',' +
            layout.size()[1] / 2 +
            ')',
        )
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', function (d) {
          return d.size + 'px';
        })
        .style('font-family', 'Impact')
        .attr('text-anchor', 'middle')
        .attr('transform', function (d) {
          return 'translate(' + [d.x, d.y] + ')';
        })
        .text(function (d) {
          return d.text;
        });
    }
  });

  return (
    <div>
      <div className={styles.containerTitle}>
        <img className={styles.imgSiren} src={iconSiren} alt="" />
        <span className={styles.textTitle}>오늘의 지각자</span>
      </div>

      <div className={styles.containerTardyList} id="word-cloud"></div>
    </div>
  );
}
