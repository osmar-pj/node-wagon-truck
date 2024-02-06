// IMPORTAMOS EL MODELO

import OperatorModel from '../models/OperatorModel.js'
import LocomotiveModel from '../models/LocomotiveModel.js'
import DriverModel from '../models/DriverModel.js'
import TruckModel from '../models/TruckModel.js';

import TajoModel from '../models/TajoModel.js';
import contractModel from '../models/ContractModel.js';

export const generateOperator = async (req, res) => {
    try {
        const count = await OperatorModel.estimatedDocumentCount();

        if (count === 0) {
            const operatorsData = [
                { operatorId: 99, name: 'Prueba', dni: '12345678', mining: 'Uchucchacua' },
                { operatorId: 1, name: 'César Santiago Espinoza', dni: '43488183', mining: 'Uchucchacua'},
                { operatorId: 2, name: 'Codoaldo Deudor Meza', dni: '20097892', mining: 'Uchucchacua' },
                { operatorId: 3, name: 'Edinson Samar Carhuas', dni: '10863723', mining: 'Uchucchacua' },
                { operatorId: 4, name: 'Francisco Janampa Noa', dni: '42318789', mining: 'Uchucchacua' },
                { operatorId: 5, name: 'Gustavo Solano Girón', dni: '42964410', mining: 'Uchucchacua' },
                { operatorId: 6, name: 'Ignacio Martínez Alejandro', dni: '04222747', mining: 'Uchucchacua' },
                { operatorId: 7, name: 'Jesús Fuentes Rivera Ugarte', dni: '40429893', mining: 'Uchucchacua' },
                { operatorId: 8, name: 'Johan Alcedo Tolentino', dni: '15217658', mining: 'Uchucchacua' },
                { operatorId: 9, name: 'Junior Díaz Rodríguez', dni: '41681455', mining: 'Uchucchacua' },
                { operatorId: 10, name: 'Raúl Villena Rojas', dni: '04053964', mining: 'Uchucchacua' },
                { operatorId: 11, name: 'Víctor Trujillo Gómez', dni: '15217609', mining: 'Uchucchacua' },
                { operatorId: 12, name: 'Vidal Bravo Chaca', dni: '04202395', mining: 'Uchucchacua' },
                { operatorId: 13, name: 'William Chávez Artica', dni: '04000950', mining: 'Uchucchacua' },
                { operatorId: 14, name: 'Nilo Fernando Damazo Fernández', dni: '06772774', mining: 'Uchucchacua' },
            ];
            
            await OperatorModel.insertMany(operatorsData);
            console.log('OPERATORS SAVED')
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};


export const generateLocomotive = async (req, res) => {
    try {
        const count = await LocomotiveModel.estimatedDocumentCount()

        if (count == 0) {

            const locomotivesData = [
                { locomotiveId: 99, description: 'LOCOMOTORA PRUEBA', brand: 'PRUEBA', model: 'PRUEBA', tag: 'PRUEBA', mining: 'Uchucchacua' },
                { locomotiveId: 1, description: 'LOCOMOTORA TROLLEY CLAYTON 45HP #01', brand: 'CLAYTON', model: 'TROLLEY', tag: 'LOCOMOTORA #01', mining: 'Uchucchacua' },
                { locomotiveId: 2, description: 'LOCOMOTORA TROLLEY CLAYTON 45HP #02', brand: 'CLAYTON', model: 'TROLLEY', tag: 'LOCOMOTORA #02', mining: 'Uchucchacua' },
                { locomotiveId: 5, description: 'LOCOMOTORA TROLLEY CLAYTON 45HP #05', brand: 'CLAYTON', model: 'TROLLEY', tag: 'LOCOMOTORA #05', mining: 'Uchucchacua' },
                { locomotiveId: 6, description: 'LOCOMOTORA TROLLEY CLAYTON 45HP #06', brand: 'CLAYTON', model: 'TROLLEY', tag: 'LOCOMOTORA #06', mining: 'Uchucchacua' },
                { locomotiveId: 8, description: 'LOCOMOTORA TROLLEY CLAYTON 45HP #08', brand: 'CLAYTON', model: 'TROLLEY', tag: 'LOCOMOTORA #08', mining: 'Uchucchacua' },
                { locomotiveId: 9, description: 'LOCOMOTORA TROLLEY CLAYTON 45HP #09', brand: 'CLAYTON', model: 'TROLLEY', tag: 'LOCOMOTORA #09', mining: 'Uchucchacua' },
                { locomotiveId: 10, description: 'LOCOMOTORA TROLLEY CLAYTON 35HP #10', brand: 'CLAYTON', model: 'TROLLEY', tag: 'LOCOMOTORA #10', mining: 'Uchucchacua' },
                { locomotiveId: 11, description: 'LOCOMOTORA TROLLEY CLAYTON 45HP #11', brand: 'CLAYTON', model: 'TROLLEY', tag: 'LOCOMOTORA #11', mining: 'Uchucchacua' },
                { locomotiveId: 20, description: 'LOCOMOTORA TROLLEY CLAYTON 45HP #20', brand: 'CLAYTON', model: 'TROLLEY', tag: 'LOCOMOTORA #20', mining: 'Uchucchacua' },
                { locomotiveId: 21, description: 'LOCOMOTORA BATERIA CLAYTON 14HP #21', brand: 'CLAYTON', model: 'TROLLEY', tag: 'LOCOMOTORA #21', mining: 'Uchucchacua' },
                { locomotiveId: 25, description: 'LOCOMOTORA TROLLEY GOODMAN #25', brand: 'GOODMAN', model: 'LM146-L', tag: 'LOCOMOTORA #25', mining: 'Uchucchacua' },
                { locomotiveId: 26, description: 'LOCOMOTORA TROLLEY GOODMAN 45HP #26', brand: 'GOODMAN', model: 'TROLLEY', tag: 'LOCOMOTORA #26', mining: 'Uchucchacua' },
                { locomotiveId: 27, description: 'LOCOMOTORA TROLLEY GOODMAN 45HP #27', brand: 'GOODMAN', model: 'TROLLEY', tag: 'LOCOMOTORA #27', mining: 'Uchucchacua' },
                { locomotiveId: 30, description: 'LOCOMOTORA BATERIA CLAYTON 25HP #30', brand: 'CLAYTON', model: 'TROLLEY', tag: 'LOCOMOTORA #30', mining: 'Uchucchacua' },
                { locomotiveId: 31, description: 'LOCOMOTORA TROLLEY GOODMAN #31', brand: 'GOODMAN', model: 'TROLLEY', tag: 'LOCOMOTORA #31', mining: 'Uchucchacua' },
                { locomotiveId: 32, description: 'LOCOMOTORA BATERIA WARREN #32', brand: 'WARREN', model: 'TROLLEY', tag: 'LOCOMOTORA #32', mining: 'Uchucchacua' },
                { locomotiveId: 34, description: 'LOCOMOTORA TROLLEY IMIM 45HP #34', brand: 'IMIM', model: 'TROLLEY', tag: 'LOCOMOTORA #34', mining: 'Uchucchacua' },
                { locomotiveId: 36, description: 'LOCOMOTORA BATERIA IMIM 14HP #36', brand: 'IMIM', model: 'TROLLEY', tag: 'LOCOMOTORA #36', mining: 'Uchucchacua' },
                { locomotiveId: 38, description: 'LOCOMOTORA BATERIA IMIM 14HP #38', brand: 'IMIM', model: 'LB 4.5', tag: 'LOCOMOTORA #38', mining: 'Uchucchacua' },
                { locomotiveId: 39, description: 'LOCOMOTORA TROLLEY CLAYTON 20HP #39', brand: 'CLAYTON', model: 'TROLLEY', tag: 'LOCOMOTORA #39', mining: 'Uchucchacua' },
                { locomotiveId: 41, description: 'LOCOMOTORA TROLLEY IMIM 45HP #41', brand: 'IMIM', model: 'TROLLEY', tag: 'LOCOMOTORA #41', mining: 'Uchucchacua' },
                { locomotiveId: 42, description: 'LOCOMOTORA TROLLEY GOODMAN 60HP #42', brand: 'GOODMAN', model: 'TROLLEY', tag: 'LOCOMOTORA #42', mining: 'Uchucchacua' },
                { locomotiveId: 43, description: 'LOCOMOTORA TROLLEY SERMINSA BEV 32HP #43', brand: 'SERMINSA', model: 'TROLLEY', tag: 'LOCOMOTORA #43', mining: 'Uchucchacua' },

            ];
            
            await LocomotiveModel.insertMany(locomotivesData);
            console.log('LOCOMOTIVES SAVED')
        }
        
    } catch (error) {
        res.json({message: error.message})
    }
}

export const generateDriver = async (req, res) => {
    try {
        const count = await DriverModel.estimatedDocumentCount();

        if (count === 0) {

            const driversData = [
                { name: 'Prueba', dni: '12345678', contract: 1, valid: 2 },

                // PEVOEX
                { name: 'Benancio Marcelo Jose Luis', dni: '80024572', contract: 2, valid: 1 },
                { name: 'Camavilca Hidalgo Jose Eduardo', dni: '20075450', contract: 2, valid: 1 },
                { name: 'Capcha Ramos Fredy Lovell', dni: '04044689', contract: 2, valid: 0 },
                { name: 'Grados Vasquez Carlos Alberto', dni: '80102826', contract: 2, valid: 1 },
                { name: 'Huaman Loyola Clever Jaime', dni: '45943722', contract: 2, valid: 1 },
                { name: 'Jimenez Lazaro Marco Antonio', dni: '42010279', contract: 2, valid: 1 },
                { name: 'Jimenez Perez Jose Jorge', dni: '42861773', contract: 2, valid: 1 },
                { name: 'Llanto Berrios David', dni: '', contract: 2, valid: 1 },
                { name: 'Mayta De La Cruz Eleazar Cesar', dni: '41525736', contract: 2, valid: 0 },
                { name: 'Poma Barreto Luis Abel', dni: '04050279', contract: 2, valid: 0 },
                { name: 'Rivera Valle Manrique Luis', dni: '71255620', contract: 2, valid: 1 },
                { name: 'Roque Lucas Melecio Daniel', dni: '15217715', contract: 2, valid: 1 },
                { name: 'Salazar Lopez Raul Angel', dni: '45973872', contract: 2, valid: 1 },
                { name: 'Tarazona Ampudia Eleaquim', dni: '41120783', contract: 2, valid: 1 },
                { name: 'Velasquez Laime Edwin', dni: '20117014', contract: 2, valid: 1 },
                { name: 'Yantas Sinche Carlos Alberto', dni: '', contract: 2, valid: 1 },
                { name: 'Zuñiga Andrade Angel Isaac', dni: '71583591', contract: 2, valid: 1 },
                { name: 'Loyola Bustillos Rolando Americo', dni: '04041738', contract: 2, valid: 1 },
                { name: 'Isidro Velarde Ezequiel Daniel', dni: '43528232', contract: 2, valid: 1 },
                { name: 'Vivas Salas Carlos', dni: '43204791', contract: 2, valid: 1 },
                { name: 'Suarez Huaman Sergio Antonio', dni: '42260408', contract: 2, valid: 1 },
                { name: 'Zelada Andrade Wardo Ruben', dni: '41237599', contract: 2, valid: 1 },

                // ECOSERMO
                { name: 'Abarca Rojas Erick Krissley', dni: '', contract: 3, valid: 1 },
                { name: 'Arteaga Palacin Felix Urbano', dni: '', contract: 3, valid: 1 },
                { name: 'Borja Cuellar Marciano', dni: '', contract: 3, valid: 1 },
                { name: 'Chauca Cardenas Luis Sigefredo', dni: '', contract: 3, valid: 1 },
                { name: 'Chavez Inocente Isaí', dni: '', contract: 3, valid: 1 },
                { name: 'De La Cruz Fuentes Rivera Anibal Denis', dni: '', contract: 3, valid: 1 },
                { name: 'Estrella Inocente Kevin Carlos', dni: '', contract: 3, valid: 1 },
                { name: 'Falcon Ponciano Grabiel', dni: '', contract: 3, valid: 1 },
                { name: 'Galvan Madueño Teofilo Paul', dni: '', contract: 3, valid: 1 },
                { name: 'Hidalgo Miranda Javier Luis', dni: '', contract: 3, valid: 1 },
                { name: 'Hidalgo Miranda Willer Roberto', dni: '', contract: 3, valid: 1 },
                { name: 'Mateo Chavez Clever Benjamin', dni: '', contract: 3, valid: 1 },
                { name: 'Mendoza Villavicencio Cesar Luis', dni: '', contract: 3, valid: 1 },
                { name: 'Morales Gonzales Alan Waldo', dni: '', contract: 3, valid: 1 },
                { name: 'Muriel Corimanya Edgar', dni: '', contract: 3, valid: 1 },
                { name: 'Pablo Ricra Ronal Rolan', dni: '', contract: 3, valid: 1 },
                { name: 'Reynoso Hidalgo Yersonn Lucio', dni: '', contract: 3, valid: 1 },
                { name: 'Torres Macedo Joel', dni: '', contract: 3, valid: 1 },
                { name: 'Yanayaco Ramos Luis Alberto', dni: '', contract: 3, valid: 1 },
                { name: 'Ingaruca Toribio Alejandro', dni: '43935612', contract: 3, valid: 1 },
                { name: 'Rivera Castillo Oscar', dni: '10776175', contract: 3, valid: 1 },
                { name: 'Torres Macedo Joel', dni: '43997473', contract: 3, valid: 1 },

                // JRC
                { name: 'Carlos Villalva, Olmedo', dni: '41712098', contract: 4, valid: 1 },
                { name: 'Choque Huamanyalli, Jose Luis', dni: '44390263', contract: 4, valid: 1 },
                { name: 'Anaya Macuri, Victor Sandalio', dni: '04023503', contract: 4, valid: 1 },
                { name: 'Bonilla Loyola, Kelvin Jhon', dni: '70761570', contract: 4, valid: 1 },
                { name: 'Bonilla Medrano, Lenin', dni: '43368126', contract: 4, valid: 1 },
                { name: 'Huaman Chavez, Nibaiot', dni: '43527878', contract: 4, valid: 1 },
                { name: 'Huaman Chavez, Wilmer', dni: '44002726', contract: 4, valid: 1 },
                { name: 'Guerra Espinoza, Kennedy Hugo', dni: '42651503', contract: 4, valid: 1 },
                { name: 'Hurtado Ureta, Willian Mauro', dni: '43689209', contract: 4, valid: 1 },
                { name: 'Lazaro Valle, Carlos Alberto', dni: '04045520', contract: 4, valid: 1 },
                { name: 'Mateo Ayala, Jerson Esmhit', dni: '70679269', contract: 4, valid: 1 },
                { name: 'Zuñiga Andrade, Edison Josue', dni: '46132488', contract: 4, valid: 1 },
                { name: 'Robles Fuster, Rodolfo', dni: '04085243', contract: 4, valid: 1 },
                { name: 'Rivera Espinoza, Javier Isaac', dni: '42038327', contract: 4, valid: 1 },
                { name: 'Guerra Espinoza, Kennedy Hugo', dni: '42651503', contract: 4, valid: 1 },
                { name: 'Santiago Espinoza, Ezer', dni: '43653111', contract: 4, valid: 1 },
                { name: 'Soto Lopez, Eliseo Javier', dni: '43218073', contract: 4, valid: 1 },
                { name: 'Espinoza Rivera, Denis Noel', dni: '44779621', contract: 4, valid: 1 }
            ]

            const drivers = driversData.map((driver, index) => {
                return {
                    driverId: index + 1,
                    name: driver.name,
                    dni: driver.dni,
                    mining: "Yumpag",
                    contract: driver.contract,
                    valid: driver.valid
                }
            })

            await DriverModel.insertMany(drivers)
            console.log('DRIVERS SAVED')

        }
    } catch (error) {
        res.json({ message: error.message });
    }
}


export const generateTruck = async (req, res) => {
    try {

        const count = await TruckModel.estimatedDocumentCount()

        if (count == 0) {

            const trucksData = [
                { description: 'TRUCK #01', tag: 'TRK-PRUEBA', tara: 15, contract: 1, valid: 2 },

                // PEVOEX
                { description: 'TRUCK #02', tag: 'AYZ-824', tara: 12, contract: 2, valid: 1 },
                { description: 'TRUCK #03', tag: 'AZK-700', tara: 11, contract: 2, valid: 1 },
                { description: 'TRUCK #04', tag: 'BKM-896', tara: 20, contract: 2, valid: 1 },
                { description: 'TRUCK #05', tag: 'BNK-776', tara: 22, contract: 2, valid: 1 },
                { description: 'TRUCK #06', tag: 'BRV-843', tara: 12, contract: 2, valid: 1 },
                { description: 'TRUCK #07', tag: 'BSZ-748', tara: 18, contract: 2, valid: 1 },
                { description: 'TRUCK #08', tag: 'BTA-916', tara: 15, contract: 2, valid: 1 },
                { description: 'TRUCK #09', tag: 'BVL-705', tara: 25, contract: 2, valid: 1 },
                { description: 'TRUCK #10', tag: 'BWK-946', tara: 17, contract: 2, valid: 1 },
                { description: 'TRUCK #11', tag: 'BNO-868', tara: 11, contract: 2, valid: 1 },
                { description: 'TRUCK #12', tag: 'BLA-737', tara: 18, contract: 2, valid: 1 },

                // ECOSERMO
                { description: 'TRUCK #13', tag: 'AUK-719', tara: 16, contract: 3, valid: 1 },
                { description: 'TRUCK #14', tag: 'AVW-746', tara: 19, contract: 3, valid: 1 },
                { description: 'TRUCK #15', tag: 'AWR-931', tara: 12, contract: 3, valid: 1 },
                { description: 'TRUCK #16', tag: 'BAW-715', tara: 11, contract: 3, valid: 1 },
                { description: 'TRUCK #17', tag: 'F6Q-929', tara: 11, contract: 3, valid: 1 },
                { description: 'TRUCK #18', tag: 'F6S-706', tara: 16, contract: 3, valid: 1 },
                { description: 'TRUCK #19', tag: 'F6S-799', tara: 19, contract: 3, valid: 1 },
                { description: 'TRUCK #20', tag: 'TBB-938', tara: 12, contract: 3, valid: 1 },

                { description: 'TRUCK #21', tag: 'F6R-764', tara: 12, contract: 3, valid: 1 },
                { description: 'TRUCK #22', tag: 'BAW-921', tara: 12, contract: 3, valid: 1 },
                { description: 'TRUCK #23', tag: 'BAW-739', tara: 12, contract: 3, valid: 1 },
                { description: 'TRUCK #24', tag: 'FGS-706', tara: 12, contract: 3, valid: 1 },
                { description: 'TRUCK #25', tag: 'BAX-717', tara: 12, contract: 3, valid: 1 },
                { description: 'TRUCK #25', tag: 'AUW-746', tara: 12, contract: 3, valid: 1 },


                // JRC
                { description: 'TRUCK #26', tag: 'BBF-754', tara: 12, contract: 4, valid: 1 },
                { description: 'TRUCK #27', tag: 'BBE-942', tara: 12, contract: 4, valid: 1 },
                { description: 'TRUCK #28', tag: 'BDY-934', tara: 12, contract: 4, valid: 1 },
                { description: 'TRUCK #29', tag: 'BXB-942', tara: 12, contract: 4, valid: 1 },
                { description: 'TRUCK #30', tag: 'BXB-812', tara: 12, contract: 4, valid: 1 },

            ];

            const trucks = trucksData.map((truck, index) => {
                return {
                    truckId: index + 1,
                    description: truck.description,
                    brand: "VOLQUETE",
                    model: "VOLVO",
                    tag: truck.tag,
                    mining: "Yumpag",
                    tara: truck.tara,
                    contract: truck.contract,
                    valid: truck.valid
                }
            })
            
            await TruckModel.insertMany(trucks);
            console.log('TRUCKS SAVED')
        }
        
    } catch (error) {
        res.json({message: error.message})
    }
}

export const generateTajo = async (req, res) => {
    try {

        // const count = await TajoModel.estimatedDocumentCount()

        // if (count == 0) {

        //     const tajosData = [
        //         { name: 'TJ200NE', valid: 1 },
        //         { name: 'TJ400_1P_1', valid: 1 },
        //         { name: 'TJ400_2P_1', valid: 1 },
        //         { name: 'TJ400_6S_1', valid: 1 },
        //         { name: 'TJ500_1S_1', valid: 1 },
        //         { name: 'TJ500_2S_1', valid: 1 },
        //         { name: 'TJ500_3P_1', valid: 1 },
        //         { name: 'TJ500_3S_1', valid: 1 },
        //         { name: 'TJ500_4S_1', valid: 1 },
        //         { name: 'TJ500_5S_1', valid: 1 },
        //         { name: 'TJ500_6P_1', valid: 1 },
        //         { name: 'TJ500_7P_1', valid: 1 },
        //         { name: 'TJ500_7S_1', valid: 1 },
        //         { name: 'TJ500_8S_1', valid: 1 },
        //         { name: 'TJ500_11P_1', valid: 1 }
        //     ];

        //     const tajos = tajosData.map((tajo, index) => {
        //         return {
        //             tajoId: index + 1,
        //             name: tajo.name,
        //             valid: tajo.valid
        //         }
        //     })

        //     await TajoModel.insertMany(tajos)
        //     console.log('TAJOS SAVED')

        // }
    }
    catch (error) {
        res.json({ message: error.message })
    }
}

export const generateContract = async (req, res) => {
    try {

        const count = await contractModel.estimatedDocumentCount()

        if (count == 0) {

            const contractData = [
                { name: 'PRUEBA' },
                { name: 'PEVOEX' },
                { name: 'ECOSERMO' },
                { name: 'JRC' }
            ];

            const contracts = contractData.map((contract, index) => {
                return {
                    contractId: index + 1,
                    name: contract.name,
                }
            })

            await contractModel.insertMany(contracts)
            console.log('CONTRACTS SAVED')

        }
    }
    catch (error) {
        res.json({ message: error.message })
    }
}