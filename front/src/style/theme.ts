export interface ITheme {
    colors: {
        logo: string,
        navLink: string,
        card: string,
        warning: string,
        success: string,
        aside: string
    },
    layout: {
        itemInterval: string
    },
    itemFontSize: string
}
export interface IThemeData {
    'default': ITheme
    'dark': ITheme
}
export const themeData: IThemeData = {
    'default': {
        colors: {
            logo: '#4E3227',
            navLink: '#A6A6A6',
            card: '#706E6C',
            aside: '#83521E',
            warning: '#123123',
            success: '#123123'
        },
        layout: {
            itemInterval: '10px'
        },
        itemFontSize: '12px'
    },
    'dark': {
        colors: {
            logo: 'red',
            navLink: 'orange',
            card: 'blue',
            aside: 'green',
            warning: '#123123',
            success: '#123123'
        },
        layout: {
            itemInterval: '10px'
        },
        itemFontSize: '12px'
    }

} 