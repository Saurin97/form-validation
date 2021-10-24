import React, { Component,Fragment } from 'react';
import TableRaw from '../../components/table/tableRaw/tableRaw';
import TableColumn from '../../components/table/tableColumn/tableColumn';
import EditIcon from '../../components/ui/editIcon/editIcon';
import DeleteIcon from '../../components/ui/deleteIcon/deleteIcon';
import {connect} from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {TableState,State,TableMapDispatchToProps,TableDataColumn} from '../../interface/interface';
import * as actionTypes from '../../store/actions';
import * as asynceReq from '../../store/async';
import { Link } from 'react-router-dom'

class table extends Component<TableState & State & TableMapDispatchToProps & TableDataColumn> {
    state = {
        searchByCategory : '',
        search : ''
    }

    searchInputHandle = (event:React.ChangeEvent<HTMLInputElement>) => {  //TABLE
        this.setState ({search : event.target.value})
    }

    editUserHandle = (key:number) => {}  //table

    selectInplutHandler = (event:React.ChangeEvent<HTMLSelectElement>) =>  {
        this.setState({searchByCategory : event.target.value})
    }

    componentDidMount () {
      this.props.loadIngredients();
    }

    render () {
        const userData:any = this.props.userData.filter(data => {
            switch (this.state.searchByCategory) {
                case 'firstname':
                    if (data.firstname.toLowerCase().includes(this.state.search.toLowerCase())) {
                        return data;
                    }
                    break;

                case 'lastname':
                    if (data.lastname.toLowerCase().includes(this.state.search.toLowerCase())) {
                        return data
                    }
                    break;

                case 'gender':
                    if (data.gender.toLowerCase().includes(this.state.search.toLowerCase())) {
                        return data
                    }
                    break;

                case 'language':
                    const language = data.language.join(' ,');
                    if (language.includes(this.state.search.toLowerCase())) {
                        return data
                    }
                    break;

                case 'city':
                    if (data.city.toLowerCase().includes(this.state.search.toLowerCase())) {
                        return data
                    }
                    break;

                default:
                    return data;
            }
        })

        let tableRaw = userData.map((ur:any ,key:number) => {
            const datacolumn = []

            for (const columnData in ur) {
                const entryValue :any = ur[columnData]
                // console.log(ur[columnData]);

                datacolumn.push(
                    {
                        entryName: columnData,
                        entryValue : entryValue
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
                                <EditIcon userId = {key} clicked = {() => this.editUserHandle(key)} />
                                <DeleteIcon clicked = {() => this.props.deleteUserDetails(key)} />
                            </td>
                        </Fragment>
                    </TableRaw>)
        })

        let table = null
        const isDisable: boolean = (this.state.searchByCategory === '')? true : false;

        if (this.props.userData.length !== 0) {
            table =  <div className='container'>
                    <div className="table-data">
                        <div className='flex justify-between'>
                            <Link to='/add-user'>
                                <button className='button rounded-button'>Add Data</button>
                            </Link>
                            <div className='position-reletive flex'>
                            <select className='transperent-dropdown' value={this.state.searchByCategory} onChange={(event:React.ChangeEvent<HTMLSelectElement>) =>  this.selectInplutHandler(event)}>
                                        <option hidden value="">Select</option>
                                        <option value="firstname">FirstName</option>
                                        <option value="lastname">LastName</option>
                                        <option value="gender">Gender</option>
                                        <option value="language">Language</option>
                                        <option value="city">City</option>
                                    </select>
                                <input
                                    type='text'
                                    disabled= {isDisable}
                                    onChange = {this.searchInputHandle}
                                    value = {this.state.search}
                                    placeholder=  {isDisable ? 'please select one category' : 'Filter By ' + this.state.searchByCategory}
                                    className='search-input'
                                />
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
                            {(userData.length === 0)? null : tableRaw}
                                {/* {userList} */}
                            </tbody>
                        </table>
                        {(userData.length === 0)? <h4 className='text-center mt-50 font-medium'>NO Match Found</h4> : null}
                    </div>
            </div>
        }
        return table;
    }
}

const mapStateToProps = (state:State) => {
    return {
        userData : state.userData,
    }
}

interface Action {
   type: string,
   payload? : any
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>):TableMapDispatchToProps => {
    return {
        deleteUserDetails : (key) => dispatch({type:actionTypes.DELETE_USER_DETAILS,key: key}),
        loadIngredients : () => dispatch (asynceReq.initIngridients())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(table);
