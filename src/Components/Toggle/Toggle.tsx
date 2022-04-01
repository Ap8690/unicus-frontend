import React, { useEffect, useState } from 'react'
import './Toggle.scss'

const Toggle = () => {
    const [checked, setChecked] = useState(true)
    useEffect(() => {
        function toggle() {
            console.log('TEST', checked)

            // var theme: any = document.getElementById('toogle__id__checkbox')
            // var white_theme = false
            // theme.addEventListener('click', () => {
            if (!checked) {
                // white_theme = true
                document.documentElement.style.setProperty(
                    '--primary_theme',
                    '#2D61DB'
                )
                document.documentElement.style.setProperty(
                    '--theme_bg',
                    'linear-gradient(113.49deg, #b9cce9 -21.3%, #00398e 38.12%)'
                )
                document.documentElement.style.setProperty(
                    '--secondary_theme',
                    '#e1e8f3'
                )
                document.documentElement.style.setProperty(
                    '--background_gradient',
                    'linear-gradient(95.11deg, #b9cce936 -28.61%, #00398e61 112.24%)'
                )
                document.documentElement.style.setProperty(
                    '--text_default_pure',
                    '#000'
                )
                document.documentElement.style.setProperty(
                    '--light_grey',
                    '#565656'
                )
                document.documentElement.style.setProperty(
                    '--gradient_five',
                    'rgba(45, 97, 219, 0.5)'
                )
                document.documentElement.style.setProperty(
                    '--gradient_seven',
                    '#2d61db'
                )
                document.documentElement.style.setProperty(
                    '--transparent_card_primary',
                    '#4a49492b'
                )
                document.documentElement.style.setProperty(
                    '--transparent_card_secondary',
                    '#3838382b'
                )
                document.documentElement.style.setProperty(
                    '--outlined__button',
                    'transparent'
                )
                document.documentElement.style.setProperty(
                    '--navbar_default_dull',
                    '#1a1919a6'
                )
                document.documentElement.style.setProperty(
                    '--invert__constant',
                    'invert(1)'
                )
                document.documentElement.style.setProperty(
                    '--popupBackground',
                    '#3636363d'
                )
                document.documentElement.style.setProperty(
                    '--search__bar',
                    '#5c5b5b84'
                )
            } else {
                // white_theme = false
                document.documentElement.style.setProperty(
                    '--primary_theme',
                    '#2d61db'
                )
                document.documentElement.style.setProperty(
                    '--theme_bg',
                    '#0e2c59'
                )
                document.documentElement.style.setProperty(
                    '--secondary_theme',
                    'rgba(27, 44, 71, 0.5)'
                )
                document.documentElement.style.setProperty(
                    '--background_gradient',
                    'linear-gradient(121.51deg,#0a1830 -19.56%,#04122c 107.27%)'
                )
                document.documentElement.style.setProperty(
                    '--text_default_pure',
                    '#fff'
                )
                document.documentElement.style.setProperty(
                    '--light_grey',
                    '#fff'
                )
                document.documentElement.style.setProperty(
                    '--gradient_five',
                    'linear-gradient(96.21deg,#2d61db 0.75%,#00123d 100%)'
                )
                document.documentElement.style.setProperty(
                    '--gradient_seven',
                    'rgba(214, 214, 214, 0.2)'
                )
                document.documentElement.style.setProperty(
                    '--transparent_card_primary',
                    '#d7d6d60f'
                )
                document.documentElement.style.setProperty(
                    '--transparent_card_secondary',
                    '#d7d6d612'
                )
                document.documentElement.style.setProperty(
                    '--outlined__button',
                    'transparent'
                )
                document.documentElement.style.setProperty(
                    '--navbar_default_dull',
                    'rgba(255, 255, 255, 0.7)'
                )
                document.documentElement.style.setProperty(
                    '--invert__constant',
                    'invert(0)'
                )
                document.documentElement.style.setProperty(
                    '--popupBackground',
                    '#a7a5a53d'
                )
                document.documentElement.style.setProperty(
                    '--search__bar',
                    '#c4c4c466'
                )
            }
            // })
        }
        toggle()
    }, [checked])

    return (
        <div className='toggle__wrapper_container'>
            <input
                type='checkbox'
                className='toggle__checkbox'
                checked={checked}
                id='toogle__id__checkbox'
            />
            <label className='toggle__label'>
                <i className='fas fa-moon'></i>
                <i className='fas fa-sun'></i>
                <div
                    className='toggle__ball'
                    onClick={() => setChecked(!checked)}
                />
            </label>
        </div>
    )
}

export default Toggle
function c(
    arg0: string,
    arg1: string,
    arg2: any,
    arg3: number,
    arg4: number,
    arg5: any,
    arg6: number,
    c: any,
    arg8: number
) {
    throw new Error('Function not implemented.')
}
