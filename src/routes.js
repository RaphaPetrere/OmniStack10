import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        //se quiser trocar o nome dessa pagina main, ce coloca os 2 pontos, transformando em objeto
        Main : {
            screen : Main, //qual componente será renderizado
            navigationOptions : { 
                title : 'DevRadar'
            } //opções especificas dessa tela
        },
        Profile : {
            screen : Profile,
            navigationOptions : {
                title : 'Perfil no Github'
            }
        },
    }, {
        defaultNavigationOptions : {
            //aplicadas a todas as telas
            headerTintColor : '#FFF', 
            headerBackTitleVisible : false, //senão no iOS fica o nome da pagina passada na flecha
            headerStyle : {
                backgroundColor : '#7D40E7',
                
            },
        },
    })
);

export default Routes;