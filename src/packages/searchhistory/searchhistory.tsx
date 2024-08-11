import React, {
  FunctionComponent,
  ReactNode,
  useState,
  useRef,
  useEffect
} from 'react'
import classNames from 'classnames';
import {SearchBar} from '@nutui/nutui-react'
import {
  ArrowLeft,
  Eye,
  Marshalling,
  Photograph,
  Refresh,
  Search,
  Trash,
} from '@nutui/icons-react-taro'
import { useConfig } from '@/packages/configprovider'
import bem from '@/utils/bem'
import { IComponent } from '@/utils/typings'

export type IsearchItem = {
  key: ReactNode,
  url: string
}

export interface SearchHistoryProps extends IComponent {
  recentSearchData: Array<IsearchItem>
  searchDiscoverData: Array<IsearchItem>
  recentSearchText: string
  searchDiscoverText: string
  backIcon: ReactNode
  deleteIcon: ReactNode
  keyword: string
  leftInIcon: ReactNode
  rightOutIcon: ReactNode
  rightInIcon: ReactNode
  searchDiscoverExtra?: ReactNode
  openEyeIcon: ReactNode
  closeEyeIcon: ReactNode
  refreshIcon?: string
  noDiscoverDataText: string
  deleteType: string
  recentSearchCollapse: boolean
  onClickSearchButton: (value: string) => void
  onClickBackIcon: () => void
  onClickSearchItem: (searchItem: IsearchItem) => void
  onClickRightInIcon: () => void
  onSearchBarChange: (value: string) => void
  onDelete: () => void
  onDeleteSingle: (item: IsearchItem) => void
  onRefresh: () => void
  placeholder: string
}

export const SearchHistory: FunctionComponent<
  Partial<SearchHistoryProps>
> = (props) => {
  const { locale } = useConfig()
  const {
    className,
    style,
    recentSearchText = locale.searchHistory.recentSearchText,
    searchDiscoverText = locale.searchHistory.searchDiscoverText,
    backIcon = 'left',
    deleteIcon = 'del',
    keyword = '',
    recentSearchData = [],
    searchDiscoverData = [],
    leftInIcon = <Search size="12" />,
    rightOutIcon = locale.searchHistory.rightOutIcon,
    rightInIcon = <Photograph size="12" />,
    openEyeIcon = <Eye />,
    closeEyeIcon = <Marshalling />,
    refreshIcon = "refresh",
    searchDiscoverExtra,
    noDiscoverDataText = locale.searchHistory.noDiscoverDataText,
    deleteType = 'all',
    recentSearchCollapse = true,
    onClickSearchButton,
    onClickBackIcon,
    onClickSearchItem,
    onClickRightInIcon,
    onSearchBarChange,
    onDelete,
    onDeleteSingle,
    onRefresh,
    placeholder,
    ...rest
  } = {
    ...props,
  }

  const [value, setValue] = useState<string>(keyword)
  const [eyeOpened, setEyeOpened] = useState<boolean>(true)
  const [isShowDeleteSearchItemIcon, setIsShowDeleteSearchItemIcon] = useState<boolean>(false)

  const handleChange = (val: string) => {
    setValue(val)
    onSearchBarChange && onSearchBarChange(val)
  }

  const handleClear = () => {
    setValue('');
  }

  const handleSearch = (val: string) => {
    handleClear();
    onClickSearchButton && onClickSearchButton(val)
  }

  const renderSearchBar = () => {
    return <SearchBar
      placeholder={placeholder}
      shape="round"
      className={classNames({'nut-searchbar-no-left-in-icon': leftInIcon === ''})}
      value={value}
      leftIn={leftInIcon}
      rightIn={<div onClick={() => onClickRightInIcon && onClickRightInIcon()}>{rightInIcon}</div>}
      left={<div onClick={() => onClickBackIcon && onClickBackIcon()}>{typeof backIcon === 'string' ? <ArrowLeft size="14" /> : backIcon}</div>}
      right={<div onClick={() => handleSearch(value as string)}>{rightOutIcon}</div>}
      onClear={handleClear}
      onChange={handleChange}
    />
  }

  const handleDelete = () => {
    if(deleteType === 'single' && !isShowDeleteSearchItemIcon) {
      setIsShowDeleteSearchItemIcon(true)
    } else {
      onDelete && onDelete()
    }
  }

  const handleClickSearchItem = (item: IsearchItem) => {
    if(isShowDeleteSearchItemIcon) {
      onDeleteSingle && onDeleteSingle(item)
    } else {
      onClickSearchItem && onClickSearchItem(item)
    }
  }

  const renderSearchHistoryResult = () => {
    return <div className={b('recent')}>
      <div className={b('recent-tit')}>
        <div>{recentSearchText}</div>
        {
          isShowDeleteSearchItemIcon ? <div className={b('recent-divider-box')}>
            <div onClick={handleDelete}>{locale.searchHistory.deleteAll}</div>
            <div className={b('recent-divider')}>|</div>
            <div onClick={() => setIsShowDeleteSearchItemIcon(false)}>{locale.searchHistory.finish}</div>
          </div> : <div onClick={handleDelete}>{typeof deleteIcon === 'string' ? <Trash /> : deleteIcon}</div>
        }
      </div>
      {
        <div className={b('recent-tags')}>
          {recentSearchData.map((item, index) => {
            return <a key={index} onClick={()=>handleClickSearchItem(item)}>{item.key}{isShowDeleteSearchItemIcon && <span>X</span>}</a>
          })}
        </div>
      }
    </div>
  }

  const handleToggleEye =(eyeOpened: boolean) => {
    setEyeOpened(eyeOpened)
  }

  const renderSearchDiscover = () => {
    return <div className={b('discover')}>
      <div className={b('discover-tit')}>
        <div>{searchDiscoverText}{searchDiscoverExtra}</div>
        <div className={b('discover-icons')}>
          {refreshIcon && <div className={b('discover-refresh')} onClick={() => onRefresh && onRefresh()}><Refresh /></div>}
          {
            eyeOpened ? <div onClick={() => handleToggleEye(false)}>{openEyeIcon}</div> : <div className='close-eye'>
              {!noDiscoverDataText && <div className='close-eye-extra'>{locale.searchHistory.hidden}</div>}
              <div onClick={() => handleToggleEye(true)}>{closeEyeIcon}</div>
            </div>
          }
        </div>
      </div>
      {
        searchDiscoverData.length > 0 && eyeOpened && <div className={b('recent-tags')}>
          {searchDiscoverData.map((item, index) => {
            return <a key={index} onClick={()=>handleClickSearchItem(item)}>{item.key}</a>
          })}
          </div>
      }
      {
        searchDiscoverData.length > 0 && !eyeOpened && noDiscoverDataText && <div className='no-discover-data'>{noDiscoverDataText}</div>
      }
    </div>
  }

  const b = bem('search-history')

  return (
    <div className={classNames([b(),className])} style={style} {...rest}>
      {renderSearchBar()}
      {recentSearchData.length > 0 && renderSearchHistoryResult()}
      {searchDiscoverData.length > 0 && renderSearchDiscover()}
    </div>
  )
}

SearchHistory.displayName = 'NutSearchHistory'
