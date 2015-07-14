# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version '>= 1.5.1'

Vagrant.configure('2') do |config|
  config.vm.box_url = 'https://www.dropbox.com/s/lqsd8es9nrfwm43/alfresco-50d.box?dl=1'
  config.vm.box = 'alfresco50d'

  # Required for NFS to work, pick any local IP

  config.vm.network "public_network"
  config.vm.network :private_network, ip: '192.168.33.6'

  config.vm.hostname = 'alfresco-50d'
  config.hostsupdater.aliases = ["alfresco"]

  if !Vagrant.has_plugin? 'vagrant-hostsupdater'
    puts 'vagrant-hostsupdater missing, please install the plugin:'
    puts 'vagrant plugin install vagrant-hostsupdater'
  else
    # If you have multiple sites/hosts on a single VM
    # uncomment and add them here
    #config.hostsupdater.aliases = %w(site2.dev)
  end

  config.vm.provider 'virtualbox' do |vb|
    # Give VM access to all cpu cores on the host
    cpus = case RbConfig::CONFIG['host_os']
      when /darwin/ then `sysctl -n hw.ncpu`.to_i
      when /linux/ then `nproc`.to_i
      else 2
    end

    # Customize memory in MB
    vb.customize ['modifyvm', :id, '--memory', 2048]
    vb.customize ['modifyvm', :id, '--cpus', cpus]

    # Fix for slow external network connections
    vb.customize ['modifyvm', :id, '--natdnshostresolver1', 'on']
    vb.customize ['modifyvm', :id, '--natdnsproxy1', 'on']
  end
end
