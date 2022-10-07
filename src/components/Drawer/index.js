import React from "react"
import MuiDrawer from '@mui/material/Drawer'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';

export default function Drawer({
  facets,
  // values,
  facet, setFacet,
  filters, setFilters,
  // value, setValue,
  // optControlled, setOptControlled
  percent, setPercent,
  streamgraph, setStreamgraph,
}) {

  const drawerWidth = 300

  return(
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        
        {/* <ListItem
          secondaryAction={
            <Checkbox
              edge="end"
              onChange={() => setOptControlled(!optControlled)}
              checked={optControlled}
            />
          }
        >
          <ListItemText primary="Controlled FIs only" />
        </ListItem> */}

        {/* <Divider />
        <ListSubheader>หน่วย</ListSubheader>
        <ListItem>
          <RadioGroup defaultValue={value}>
            {Object.keys(values).map(v =>
              <FormControlLabel
                key={v}
                value={v}
                control={<Radio />}
                label={values[v]}
                onChange={() => setValue(v)}
              />
            )}
          </RadioGroup>
        </ListItem> */}

        {/* <Divider /> */}
        <ListSubheader>แยกประเภทตาม</ListSubheader>
        <ListItem>
          <RadioGroup
            // defaultValue={facet}
            value={facet}
            onChange={event => setFacet(event.target.value)}
          >
            {Object.keys(facets).map(f =>
              <FormControlLabel
                key={f}
                value={f}
                control={<Radio size="small" />}
                label={facets[f].label}
              />
            )}
          </RadioGroup>
        </ListItem>

        <Divider />
        <ListSubheader>Filters</ListSubheader>
        {
          Object.keys(facets).map(filterType => {
            const singleType = facets[filterType].type === "single"
            return(
              <ListItem key={filterType}>
                <FormControl
                  fullWidth
                  size="small"
                >
                  <InputLabel>{facets[filterType].label}</InputLabel>
                  <Select
                    labelId={filterType}
                    value={filters[filterType]}
                    label={facets[filterType].label}
                    multiple={!singleType}
                    renderValue={selected => selected.map(x => facets[filterType].groups[x].label).join(', ')}
                    onChange={event => {
                      setFilters({
                        ...filters,
                        [filterType]: singleType ? [event.target.value] : event.target.value,
                        meta: filterType,
                      })
                    }}
                  >
                    {
                      Object.keys(facets[filterType].groups).map(x => {
                        if (x === '9' && singleType)
                          return null
                        return(
                          <MenuItem
                            key={parseInt(x)}
                            value={parseInt(x)}
                          >
                            {!singleType &&
                              <Checkbox
                                checked={filters[filterType].indexOf(parseInt(x)) > -1}
                                size="small"
                              />
                            }
                            <ListItemText primary={facets[filterType].groups[x].label} />
                          </MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </ListItem>
            )
          })
        }

        <Divider />
        {/* <FormControlLabel
          control={
            <Checkbox
              size="small"
              onChange={event => setStreamgraph(event.target.checked)}
            />
          }
          label="Streamgraph"
        /> */}
        <ListItem>
          <FormControl fullWidth>
            <FormControlLabel
              value="start"
              control={<Switch
                checked={percent}
                onChange={e => setPercent(e.target.checked)}
              />}
              label="แสดงสัดส่วนจากผู้กู้ทั้งหมด"
            />
          </FormControl>
        </ListItem>

      </List>
    </MuiDrawer>
  )

}