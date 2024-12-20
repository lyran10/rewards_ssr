import { useEffect, useState } from 'react'
import { useRedux } from './useRedux'
import { useSession } from './useSession'
import { getRedeemOffers } from '../store/actions'
import { InputTypes } from '../types/types'

type Props = {
  data : InputTypes
}

export const useGetRedeemOffers = ({data} : Props) => {
  const {dispatch, selector} = useRedux()
  const {confirmClaim} = selector(state => state.data)
  const {getValue} = useSession()
  const [loading, setLoading] = useState<boolean>(false)
  const [redeemOffers, setRedeemOffers] = useState<any[]>([])

  const fetchOffers = async() => {
  setLoading(true)
  const {payload} = await dispatch(getRedeemOffers(getValue() && getValue().level || getValue().level === 0 ? getValue().data.aId : getValue().id))
  setRedeemOffers(payload.subCatRedeemHistory)
  setLoading(false)
  }

  useEffect(() => {
    if(!confirmClaim) fetchOffers()
  },[confirmClaim])

  return {redeemOffers, loading, fetchOffers}
}
