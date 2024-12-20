import { useEffect, useState } from 'react'
import { useRedux } from './useRedux'
import { useSession } from './useSession'
import { getClaimOffers } from '../store/actions'
import { InputTypes } from '../types/types'

type Props = {
  data : InputTypes
}

export const useGetClaimOffers = ({data} : Props) => {
  const {dispatch} = useRedux()
  const {getValue} = useSession()
  const [loading, setLoading] = useState<boolean>(false)
  const [claimOffers, setClaimOffers] = useState<any[]>([])

  const fetchOffers = async() => {
  setLoading(true)
  const {payload : {subCatClaimHistory}} = await dispatch(getClaimOffers(getValue() && getValue().level || getValue().level === 0 ? getValue().data.aId : getValue().id))
  setClaimOffers(subCatClaimHistory)
  setLoading(false)
  }

  useEffect(() => {
    fetchOffers()
  },[])

  return {claimOffers, loading, fetchOffers}
}