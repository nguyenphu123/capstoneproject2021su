import Button from '@material-ui/core/Button'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import ComparatorItem from '../ComparatorItems/ComparatorItem'
import {
  comparator,
  emptyComparator,
  deleteItemComparator
} from '../../features/Comparator/ComparatorSlice'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const mapDispatch = { comparator, emptyComparator, deleteItemComparator }

function Comparator () {
  const dispatch = useDispatch()
  const ComparatorSlice = useSelector(state => state.ComparatorSlice.comparator)

  if (ComparatorSlice !== null && ComparatorSlice.length !== 0) {
    function removeAll (e) {
      e.preventDefault()
      dispatch(emptyComparator())
    }
    function removeFromCart (Id) {
      dispatch(deleteItemComparator(Id))
    }

    return (
      <>
        {/* <!-- BEGIN Main Container --> */}

        <div class='main-container col1-layout wow bounceInUp animated'>
          <div class='main'>
            <div class='cart wow bounceInUp animated'>
              <div class='table-responsive shopping-cart-tbl  container'>
                <form action='' method='post'>
                  <fieldset>
                    <table
                      id='shopping-cart-table'
                      class='data-table cart-table table-striped'
                    >
                      <colgroup>
                        <col width='1' />
                        <col />
                        <col width='1' />
                        <col width='1' />
                        <col width='1' />
                        <col width='1' />
                        <col width='1' />
                      </colgroup>
                      <thead>
                        <tr class='first last'>
                          <th rowspan='1'>&nbsp;</th>
                          <th rowspan='1'>
                            <span class='nobr'>Product Name</span>
                          </th>
                          <th rowspan='1'></th>
                          <th class='a-center' colspan='1'>
                            <span class='nobr'>Unit Price</span>
                          </th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr class='first last'>
                          <td colspan='50' class='a-right last'>
                            <button
                              name='update_cart_action'
                              title='Clear Cart'
                              class='button btn-empty'
                              onClick={removeAll}
                            >
                              <span>
                                <span>Clear All</span>
                              </span>
                            </button>
                          </td>
                        </tr>
                      </tfoot>
                      <tbody>
                        {ComparatorSlice.map(
                          ({
                            ProductId,
                            Name,
                            CurrentPrice,
                            img,
                            Elements
                          }) => (
                            <tr class='first last odd'>
                              <ComparatorItem
                                Id={ProductId}
                                Name={Name}
                                Price={CurrentPrice}
                                ImageUrl={img}
                                Elements={Elements}
                              />

                              <td class='a-center last'>
                                <Button
                                  onClick={() => removeFromCart(ProductId)}
                                  title='Remove item'
                                  class='button remove-item'
                                >
                                  <span>
                                    <span>Remove item</span>
                                  </span>
                                </Button>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </fieldset>
                </form>
              </div>

              {/* <!-- BEGIN CART COLLATERALS --> */}
            </div>

            {/* <!--cart--> */}
          </div>

          {/* <!--main-container--> */}
        </div>

        {/* <!--col1-layout--> */}
      </>
    )
  } else {
    return (
      <div style={{ marginTop: '250px' }}>
        <Header as='h1'>Nothing to compare</Header>
      </div>
    )
  }
}
export default Comparator
