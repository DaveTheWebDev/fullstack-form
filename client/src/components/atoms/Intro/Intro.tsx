import React, { memo } from 'react';
import me from 'assets/ja.png';
import brainhub from 'assets/brainhub.svg';
import { XIcon } from 'components/atoms/icons/XIcon';
import * as S from './Intro.styles'

export const Intro: React.FC = memo(() => {
  return <S.Wrapper>
    <S.Link href='https://github.com/DaveTheWebDev' target='_blank'>
      <S.Image src={me} alt="Me" />
    </S.Link>
    <XIcon />
    <S.Logo src={brainhub} alt="Brainhub logo" />
  </S.Wrapper>
})
