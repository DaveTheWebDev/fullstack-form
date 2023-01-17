import React, { memo } from 'react';
import { IntroProps } from './Intro.types'
import me from '../../../assets/ja.png';
import brainhub from '../../../assets/brainhub.svg';
import * as S from './Intro.styles'
import { XIcon } from '../icons/XIcon';

export const Intro: React.FC<IntroProps> = memo(() => {
  return <S.Wrapper>
    <S.Link href='https://github.com/DaveTheWebDev' target='_blank'>
      <S.Image src={me} alt="Me" />
    </S.Link>
    <XIcon />
    <S.Logo src={brainhub} alt="Brainhub logo" />
  </S.Wrapper>
})
