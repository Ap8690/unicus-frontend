import * as React from 'react'
import { styled } from '@mui/material/styles'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 40,
    height: 40,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        // margin: 1,
        padding: 0,
        transform: 'translateX(0px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(0px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="-2.7 -2.7 20 20"><path fill="${encodeURIComponent(
                    '#fff'
                )}" d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor:
                    theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        border: '2px solid white',
        width: 40,
        height: 40,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="-0.5 -1 20 20"><path fill="${encodeURIComponent(
                '#fff'
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
        width: 0,
    },
}))

const MaterialSwitch = () => {
    const [checked, setChecked] = React.useState(true)
    React.useEffect(() => {
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
                document.documentElement.style.setProperty(
                    '--searchInputBorder',
                    '#5c5b5b84'
                )
                document.documentElement.style.setProperty(
                    '--searchInputTextColor',
                    '#202020'
                )
                document.documentElement.style.setProperty(
                    '--wallletTypeProvider',
                    '#001e3c'
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
                document.documentElement.style.setProperty(
                    '--searchInputBorder',
                    '#86b7fe'
                )
                document.documentElement.style.setProperty(
                    '--searchInputTextColor',
                    '#fff'
                )
                document.documentElement.style.setProperty(
                    '--wallletTypeProvider',
                    'transparent'
                )
            }
            // })
        }
        toggle()
    }, [checked])

    return (
        <FormGroup>
            <FormControlLabel
                sx={{ marginRight: '10px' }}
                control={
                    <MaterialUISwitch
                        defaultChecked={checked}
                        onClick={(e) => setChecked(e.target.checked)}
                    />
                }
                label=''
            />
        </FormGroup>
    )
}

export default MaterialSwitch
