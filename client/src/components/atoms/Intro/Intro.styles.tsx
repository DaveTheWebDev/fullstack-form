import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0 40px;
`
const Link = styled.a`
margin-right: 20px;
`

const Logo = styled.img`
width: 150px;
margin-left: 20px;
`
const Image = styled.img`
width: 150px;
height: 150px;
object-fit: cover;
border-radius: 50%;
transition: .3s;
&:hover {
  filter: opacity(0.8);
}
`

export { Wrapper, Logo, Image, Link }