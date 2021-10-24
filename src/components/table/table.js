import React, { Fragment } from 'react';
import TableRaw from './tableRaw/tableRaw';
import TableColumn from './tableColumn/tableColumn';
import EditIcon from '../ui/editIcon/editIcon';
import DeleteIcon from '../ui/deleteIcon/deleteIcon';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
import { Link } from 'react-router-dom'


const table = (props) => {

    const userData = props.userData.filter (data => {
        
        if(props.search == '') {
            // console.log(data);
            return data
        }
        else if(data.city.toLowerCase().includes(props.search.toLowerCase()) || data.firstname.toLowerCase().includes(props.search.toLowerCase())){
            // console.log(data);
            return data
        }
    })    

    let tableRaw = userData.map((ur,key) => {
        const datacolumn = []

        for (const columnData in ur) {
            datacolumn.push(
                {
                    entryName: columnData,
                    entryValue : ur[columnData]
                }
            )
        }

        const dataEntryOutput = datacolumn.map((de,key) => {
            if (de.entryName ==='language') {
            return <TableColumn key ={key} entry={de.entryValue.join(' , ')}/> 
                
            } else {
                return <TableColumn key ={key} entry={de.entryValue}/> 
            }
        })
        
        return (<TableRaw key={key}>
                    <Fragment>
                        {dataEntryOutput}
                        <td>
                            <EditIcon clicked = {() => props.editUserHandle(key)} />
                            <DeleteIcon clicked = {() => props.deleteUserDetails(key)} />
                        </td>
                    </Fragment>
                </TableRaw>)
    })

    let table = null

    if (props.userData.length !== 0) {
        table =  <div className='container'>
            <div className="table-data">
                <div className='flex justify-between'>
                    <Link to='/form'>
                        <button className='button rounded-button'>Add Data</button>
                    </Link>
                    <div className='position-reletive'>
                        <input type='text' onChange = {props.searchInputHandle} value = {props.search} placeholder='Filter By City' className='search-input' />
                        <svg viewBox="0 0 515.558 515.558" className='search-btn'>
                            <path d="m378.344 332.78c25.37-34.645 40.545-77.2 40.545-123.333 0-115.484-93.961-209.445-209.445-209.445s-209.444 93.961-209.444 209.445 93.961 209.445 209.445 209.445c46.133 0 88.692-15.177 123.337-40.547l137.212 137.212 45.564-45.564c0-.001-137.214-137.213-137.214-137.213zm-168.899 21.667c-79.958 0-145-65.042-145-145s65.042-145 145-145 145 65.042 145 145-65.043 145-145 145z"/>
                        </svg>
                    </div>
                </div>
                <table id="table" className='mt-15'>
                    <thead>
                        <tr>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Gender</th>
                            <th>Language</th>
                            <th>City</th>
                            <th>Index</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRaw}
                    </tbody>
                </table>
            </div>
        </div>
    }

    return table;
}

const mapStateToProps = state => {
    return {
        userData : state.userData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteUserDetails : (key) => dispatch({type:actionTypes.DELETE_USER_DETAILS,key: key}),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(table);




// let tableRaw = props.userData.map((ur,key) => {
//     const datacolumn = []

//     for (const columnData in ur) {
//         datacolumn.push(
//             {
//                 entryName: columnData,
//                 entryValue : ur[columnData]
//             }
//         )
//     }

//     const dataEntryOutput = datacolumn.map((de,key) => {
//         if (de.entryName ==='language') {
//         return <TableColumn key ={key} entry={de.entryValue.join(' , ')}/> 
            
//         } else {
//             return <TableColumn key ={key} entry={de.entryValue}/> 
//         }
//     })
    
//     return (<TableRaw key={key}>
//                 <Fragment>
//                     {dataEntryOutput}
//                     <td>
//                         <EditIcon clicked = {() => props.editUserHandle(key)} />
//                         <DeleteIcon clicked = {() => props.deleteUserDetails(key)} />
//                     </td>
//                 </Fragment>
//             </TableRaw>)
// })