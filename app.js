const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')

const flowCierreConsulta = addKeyword(['Masculino', 'Femenino', 'No binario']).addAnswer(['Gracias, ya te decimos tu lugar de votacion.', 'Aguardanos un instante'])

const flowSexo = addKeyword(['']).addAnswer('Por favor, indicá tu género según figura en tu DNI. *Masculino*, *Femenino*, *No Binario*:', {capture:true},(ctx, {fallBack}) => {
    if (ctx.body != "Masculino"){

        return  fallBack()
    } 
},
[flowCierreConsulta])

const consultar = addKeyword(['consultar', 'consulta'])
.addAnswer(['Para conocer tu lugar de votación 🗳️, por favor, escribí tu número de DNI sin puntos, comas ni espacios.'
],
null,
null,
[flowSexo]
)

 
    
//const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
//    ['Gracias por usar nuestro bot' ],
//    null,
//    null,
//    [flowSecundario]
//)


const flowCierreDenuncia = addKeyword(['']).addAnswer(['*Muchas Gracias* 🙌, en instantes nos comunicamos con vos']

)

const flowEscuela = addKeyword(['']).addAnswer(['👉 Ingresa escuela donde viste irregularidades'],
null,
null,
[flowCierreDenuncia]
)


const flowDNIDenuncia = addKeyword(['']).addAnswer(['👉 Ingresa tu *DNI*'],
null,
null,
[flowEscuela]
)

// const flowNombre = addKeyword(['']).addAnswer(['👉 Ingresa tu nombre completo'],
// null,
// null,
// [flowDNIDenuncia]
// )


const denunciar = addKeyword(['denunciar', 'denuncia']).addAnswer (
    ['👉 Ingresa tu *nombre completo*'],
    null,
    null,
    [flowDNIDenuncia]
    )


const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a *Guardianes de tu voto*')
    .addAnswer(
        [
            'Estas son las opciones disponibles',
            '👉 *consultar* para consultar donde votas',
            '👉 *denunciar*  para denunciar irregularidades en una escuela',
        
        ],
        null,
        null,
        [denunciar, consultar, flowSexo,flowCierreConsulta,flowCierreDenuncia,flowDNIDenuncia,flowEscuela]
    )
    
const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    //QRPortalWeb()
}

main()
