import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

export const Nav = styled.nav`
  background: #ED872D;
  box-shadow: 1px 2px 2px 2px rgba(0,0,0,.8);
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const PathfinderToolbar = styled.nav`
  background: #784072;
  box-shadow: 0px 2px 3px 0.5px rgba(0,0,0,.8);
  height: 60px;
  display: flex;
  text-align: center;
  justify-content: space-evenly;
  padding: 10px;
  z-index: 10;
`;

export const PathfinderResults = styled.nav`
  background: #512889;
  box-shadow: 0px 2px 3px 0.5px rgba(0,0,0,.8);
  height: 25px;
  display: flex;
  text-align: center;
  justify-content: space-evenly;
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #512889;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: right;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Btn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  padding: 10px
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 2px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;