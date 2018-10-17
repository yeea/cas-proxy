import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';
import Description from '@material-ui/icons/Description';
import Computer from '@material-ui/icons/Computer';
import Assessment from '@material-ui/icons/Assessment';
import Typography from '@material-ui/core/Typography';
import RunningAnalysisDialog from './RunningAnalysisDialog';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const paperMaxWidth = '400px';
const paperMinWidth = '250px';
const paperHeight = '300px';

const styles = {
  descriptionText: {
    height: '7em',
  },
  card: {
    maxWidth: paperMaxWidth,
    height: paperHeight,
  },
  fieldIcon: {
    position: 'relative',
    top: '-2px',
  },
  appLink: {
    top: '-5px',
  },
  owner: {
    marginTop: '5px',
  },
};

const ellipsize = (s, limit) => [...s].slice(0, limit-4).join('') + '...';

class RunningAnalysisCard extends Component {
  state = {
    dialogOpen: false
  };

  handleClickMoreInfo = () => {
    this.setState({dialogOpen: true});
  };

  handleCloseDialog = () => {
    this.setState({dialogOpen: false});
  };

  handleClickAppLink = () => {
    alert("link clicked");
  };

  render() {
    const { classes } = this.props;
    const { analysisName, analysisLink, owner, description } = this.props;
    const { appName } = this.props;

    let displayDescription = "";
    if ([...description].length > 240) {
      displayDescription = ellipsize(description, 240);
    } else {
      displayDescription = description;
    }

    let displayAnalysisName = "";
    if ([...analysisName].length > 28) {
      displayAnalysisName = ellipsize(analysisName, 28);
    } else {
      displayAnalysisName = analysisName;
    }

    let displayAppName = "";
    if ([...appName].length > 28) {
      displayAppName = ellipsize(appName, 28);
    } else {
      displayAppName = appName;
    }

    let displayOwner = "";
    if ([...owner].length > 28) {
      displayOwner = ellipsize(owner, 28);
    } else {
      displayOwner = owner;
    }

    return (
      <div>
        <RunningAnalysisDialog
          handleClose={this.handleCloseDialog}
          handleClickLink={this.handleClickAppLink}
          open={this.state.dialogOpen}
          analysisName={analysisName}
          appName={appName}
          owner={owner}
          description={description}
          analysisLink={analysisLink}
        />

        <Card className={classes.card}>
          <Grid container className={classes.root} spacing={8}>
            <Grid item xs={12}>
              <CardContent>
                <Grid container className={classes.cardContentGrid} spacing={8}>
                  <Grid item xs={1}>
                    <Assessment className={classes.fieldIcon} />
                  </Grid>

                  <Grid item xs={11}>
                    <Typography gutterBottom>
                      {displayAnalysisName}
                    </Typography>
                  </Grid>

                  <Grid item xs={1}>
                    <Computer className={classes.fieldIcon} />
                  </Grid>

                  <Grid item xs={11}>
                    <Typography gutterBottom>
                      {displayAppName}

                      <Typography color="textSecondary" gutterBottom>
                        Added by {displayOwner}
                      </Typography>
                    </Typography>
                  </Grid>

                  <Grid item xs={1}>
                    <Description className={classes.descriptionIcon} />
                  </Grid>

                  <Grid item xs={11}>
                    <Typography className={classes.descriptionText}>
                      {displayDescription}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>

            <Grid item xs={12}>
              <CardActions>
                <Grid container className={classes.cardActionsGrid} spacing={8}>
                  <Grid item xs={4}>
                    <Button
                      onClick={this.handleClickMoreInfo}
                      color="secondary"
                    >
                      More Info
                    </Button>
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={1}>
                    <IconButton className={classes.appLink} onClick={this.handleClickAppLink}>
                      <OpenInBrowser />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

RunningAnalysisCard.propTypes = {
  classes:      PropTypes.object.isRequired,
  analysisName: PropTypes.string.isRequired,
  appName:      PropTypes.string.isRequired,
  owner:        PropTypes.string.isRequired,
  description:  PropTypes.string,
  analysisLink: PropTypes.string.isRequired,
};

export default withStyles(styles)(RunningAnalysisCard);
